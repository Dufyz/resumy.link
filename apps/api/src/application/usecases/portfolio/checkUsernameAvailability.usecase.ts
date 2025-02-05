import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const checkUsernameAvailability =
  (portfolioRepository: PortfolioRepository) =>
  async (username: string): Promise<Either<RepositoryErrors, boolean>> => {
    const resultOrError = await portfolioRepository.checkUsernameAvailability(
      username
    );

    if (resultOrError.isFailure()) return failure(resultOrError.value);

    const result = resultOrError.value;
    return success(result);
  };
