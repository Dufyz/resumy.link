import { Portfolio } from "../../../domain/portfolio";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const createPortfolio =
  (portfolioRepository: PortfolioRepository) =>
  async (
    body: Pick<
      Portfolio,
      "user_id" | "username" | "title" | "bio" | "avatar_path"
    >
  ): Promise<Either<RepositoryErrors, Portfolio>> => {
    const portfolioOrError = await portfolioRepository.create({
      user_id: body.user_id,
      username: body.username,
      title: body.title,
      bio: body.bio,
      avatar_path: body.avatar_path,
    });

    if (portfolioOrError.isFailure()) return failure(portfolioOrError.value);

    const portfolio = portfolioOrError.value;
    return success(portfolio);
  };
