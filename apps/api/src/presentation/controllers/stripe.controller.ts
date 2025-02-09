import { Request, Response } from "express";
import {
  createStripeCheckoutSession,
  stripeCheckoutSessionCompleted,
} from "../../application/services/stripe";
import { userRepository } from "../../infra/database/repositories/user.repository";
import { postCreateCheckoutSessionSchema } from "../validators/schemas/stripe/postCreateCheckoutSession.schema";
import z from "zod";
import { stripe } from "../../infra/stripe";
import { STRIPE_WEBHOOK_SECRET } from "../../infra/config";
import Stripe from "stripe";
import { portfolioRepository } from "../../infra/database/repositories/portfolio.repository";

export async function handleWebhook(request: Request, response: Response) {
  const sig = request.headers["stripe-signature"];

  if (!sig) {
    response.status(400).send("No stripe signature found");
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const resultOrError = await stripeCheckoutSessionCompleted(
          userRepository,
          portfolioRepository
        )(session.id);

        if (resultOrError.isFailure()) {
          console.error(resultOrError.value);
          response.status(500).send("Error processing webhook");
          return;
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
    return;
  } catch (error) {
    response.status(500).send("Error processing webhook");
    return;
  }
}

export async function handlePostCreateCheckoutSession(
  req: Request,
  res: Response
) {
  const { email, price } = req.body as unknown as z.infer<
    typeof postCreateCheckoutSessionSchema
  >["body"];

  const sessionOrError = await createStripeCheckoutSession(userRepository)({
    email,
    price,
  });

  if (sessionOrError.isFailure()) {
    res.status(400).json({ message: sessionOrError.value.message });
    return;
  }

  const session = sessionOrError.value;
  res.status(200).json({
    session,
    message: "Stripe checkout session created",
  });
}
