import Stripe from "stripe";
import { Either, failure, success } from "../../../shared/utils/either";
import { getRepositoryError, RepositoryErrors } from "../../errors";
import { UserRepository } from "../../interfaces/user.repository";
import { stripe } from "../../../infra/stripe";
import { STRIPE_PRICES, WEB_URL } from "../../../infra/config";

export const createStripeCheckoutSession =
  (userRepository: UserRepository) =>
  async (data: {
    email: string;
    price: "standard" | "lifetime";
  }): Promise<Either<RepositoryErrors, Stripe.Checkout.Session>> => {
    const userOrError = await userRepository.findByEmail(data.email);

    if (userOrError.isFailure()) return failure(userOrError.value);

    const user = userOrError.value;
    if (!user) return failure(getRepositoryError(new Error("User not found")));

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: STRIPE_PRICES[data.price],
            quantity: 1,
          },
        ],
        customer_email: user.email,
        mode: "payment",
        success_url: `${WEB_URL}/admin`,
        cancel_url: `${WEB_URL}/admin`,
        client_reference_id: user.id.toString(),
      });

      return success(session);
    } catch (error) {
      return failure(
        getRepositoryError(new Error("Error creating stripe checkout session"))
      );
    }
  };
