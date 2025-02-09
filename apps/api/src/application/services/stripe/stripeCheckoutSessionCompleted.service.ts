import { UserRepository } from "../../interfaces/user.repository";
import { Either, failure, success } from "../../../shared/utils/either";
import { STRIPE_PRICES } from "../../../infra/config";
import { RepositoryErrors } from "../../errors";
import { stripe } from "../../../infra/stripe";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const stripeCheckoutSessionCompleted =
  (userRepository: UserRepository, portfolioRepository: PortfolioRepository) =>
  async (
    sessionId: string
  ): Promise<Either<RepositoryErrors | Error, void>> => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });

      const userEmail = session.customer_email;

      if (!userEmail) {
        return failure(new Error("User email not found"));
      }

      const userOrError = await userRepository.findByEmail(userEmail);

      if (userOrError.isFailure()) {
        return failure(userOrError.value);
      }

      const user = userOrError.value;

      if (!user) {
        return failure(new Error("User not found"));
      }

      const lineItems = session.line_items;

      if (!lineItems || lineItems.data.length === 0) {
        return failure(new Error("No line items found in session"));
      }

      const price_id = lineItems.data[0].price?.id;

      if (!price_id) {
        return failure(new Error("Price id not found"));
      }

      const plan = Object.entries(STRIPE_PRICES).find(
        ([, value]) => value === price_id
      );

      if (!plan) {
        return failure(new Error("Plan not found"));
      }

      const [planName] = plan;

      if (planName === "standard") {
        const resultOrError = await userRepository.update(user.id, {
          plan_type: "standard",
          portfolio_limit: user.portfolio_limit + 1,
        });

        if (resultOrError.isFailure()) return failure(resultOrError.value);

        const portfolioOrError = await portfolioRepository.findByUserId(
          user.id
        );

        if (portfolioOrError.isFailure())
          return failure(portfolioOrError.value);

        const portfolio = portfolioOrError.value;

        if (!portfolio) return failure(new Error("Portfolio not found"));

        await portfolioRepository
          .update(portfolio.id, {
            is_active: true,
          })
          .then((result) => {
            console.log("Result", result);
            if (result.isFailure()) return failure(result.value);
          });
      } else if (planName === "lifetime") {
        const resultOrError = await userRepository.update(user.id, {
          plan_type: "lifetime",
          portfolio_limit: -1,
        });

        if (resultOrError.isFailure()) return failure(resultOrError.value);
      } else {
        return failure(new Error("Invalid plan"));
      }

      return success(undefined);
    } catch (error) {
      console.error("Error processing checkout session:", error);
      return failure(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
    }
  };
