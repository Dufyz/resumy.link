import api from "@/config/api";
import { ApiError } from "@/errors/api-error";
import { Either, failure, success } from "@/lib/either";
import Stripe from "stripe";

export async function postCreateStripeCheckoutSession(body: {
  email: string;
  price: "standard" | "lifetime";
}): Promise<
  Either<
    ApiError,
    {
      session: Stripe.Checkout.Session;
      message: string;
    }
  >
> {
  try {
    const response = await api.post("/stripe/create-checkout-session", body);

    return success(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}
