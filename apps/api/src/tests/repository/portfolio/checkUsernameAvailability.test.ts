import { v4 } from "uuid";
import { portfolioRepository } from "../../../infra/database/repositories/portfolio.repository";
import { userRepository } from "../../../infra/database/repositories/user.repository";

describe("Portfolio repository - Check username availability", () => {
  it("Should successfully Check a portfolio username availability", async () => {
    const baseUser = {
      name: "User",
      email: `${v4()}@email.com`,
    };

    const userOrError = await userRepository.create({
      name: baseUser.name,
      email: baseUser.email,
    });

    if (userOrError.isFailure()) {
      throw new Error(userOrError.value.message);
    }

    const user = userOrError.value;

    const basePortfolio = {
      user_id: user.id,
      username: `portfolio-${v4()}`,
      title: "title",
      bio: null,
      avatar_path: null,
    };

    const createdPortfolioOrError = await portfolioRepository.create({
      user_id: basePortfolio.user_id,
      username: basePortfolio.username,
      title: basePortfolio.title,
      bio: basePortfolio.bio,
      avatar_path: basePortfolio.avatar_path,
    });

    if (createdPortfolioOrError.isFailure()) {
      throw new Error(createdPortfolioOrError.value.message);
    }

    const firsResultOrError =
      await portfolioRepository.checkUsernameAvailability(
        createdPortfolioOrError.value.username
      );

    if (firsResultOrError.isFailure()) {
      throw new Error(firsResultOrError.value.message);
    }

    const teste = v4();
    const secondResultOrError =
      await portfolioRepository.checkUsernameAvailability(teste);

    if (secondResultOrError.isFailure()) {
      throw new Error(secondResultOrError.value.message);
    }

    const firstResult = firsResultOrError.value;
    expect(firstResult).toBe(true);

    const secondResult = secondResultOrError.value;
    expect(secondResult).toBe(false);
  });
});
