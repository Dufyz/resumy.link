import api from "@/config/api";
import { ApiError } from "@/errors/api-error";
import { Either, failure, success } from "@/lib/either";
import { CreatePortfolioSchema } from "@/schemas/portfolio-schema";
import { CreateUserSchema } from "@/schemas/user-schema";
import { Portfolio } from "@/types/portfolio-type";
import { User } from "@/types/user-type";

export async function postOnboarding(body: {
  user: CreateUserSchema;
  portfolio: CreatePortfolioSchema;
}): Promise<
  Either<
    ApiError,
    {
      user: User;
      portfolio: Portfolio;
    }
  >
> {
  try {
    const response = await api.post("/onboarding", body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}
