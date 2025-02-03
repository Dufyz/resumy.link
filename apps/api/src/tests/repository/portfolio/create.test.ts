import { v4 } from "uuid";
import { portfolioRepository } from "../../../infra/database/repositories/portfolio.repository";
import { userRepository } from "../../../infra/database/repositories/user.repository";

describe("Portfolio repository - Create", () => {
  it("Should successfully create a portfolio", async () => {
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

    const portfolioOrError = await portfolioRepository.create({
      user_id: basePortfolio.user_id,
      username: basePortfolio.username,
      title: basePortfolio.title,
      bio: basePortfolio.bio,
      avatar_path: basePortfolio.avatar_path,
    });

    if (portfolioOrError.isFailure()) {
      throw new Error(portfolioOrError.value.message);
    }

    const portfolio = portfolioOrError.value;
    expect(portfolio).toEqual({
      id: expect.any(String),
      user_id: basePortfolio.user_id,
      username: basePortfolio.username,
      title: basePortfolio.title,
      bio: basePortfolio.bio,
      avatar_path: basePortfolio.avatar_path,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
