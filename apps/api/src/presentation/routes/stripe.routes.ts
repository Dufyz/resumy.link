import { Router } from "express";
import { validate } from "../middlewares/zod.middleware";
import { postCreateCheckoutSessionSchema } from "../validators/schemas/stripe/postCreateCheckoutSession.schema";
import * as StripeController from "../controllers/stripe.controller";

const stripeRoutes = Router();

stripeRoutes.post(
  "/stripe/create-checkout-session",
  validate(postCreateCheckoutSessionSchema),
  StripeController.handlePostCreateCheckoutSession
);

export default stripeRoutes;
