import { v4 } from "uuid";
import { portfolioRepository } from "../../../infra/database/repositories/portfolio.repository";
import { userRepository } from "../../../infra/database/repositories/user.repository";

describe("Portfolio repository - Find by id", () => {
  it("Should successfully find a portfolio by id", async () => {
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
      name: `portfolio-${v4()}`,
    };

    const createdPortfolioOrError = await portfolioRepository.create({
      user_id: basePortfolio.user_id,
      name: basePortfolio.name,
    });

    if (createdPortfolioOrError.isFailure()) {
      throw new Error(createdPortfolioOrError.value.message);
    }

    const portfolioOrError = await portfolioRepository.findById(
      createdPortfolioOrError.value.id
    );

    if (portfolioOrError.isFailure()) {
      throw new Error(portfolioOrError.value.message);
    }

    const portfolio = portfolioOrError.value;
    expect(portfolio).toEqual({
      id: expect.any(String),
      user_id: basePortfolio.user_id,
      name: basePortfolio.name,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
