import { v4 } from "uuid";
import { portfolioRepository } from "../../../infra/database/repositories/portfolio.repository";
import { userRepository } from "../../../infra/database/repositories/user.repository";
import { PortfolioSectionType } from "../../../domain/portfolio/portfolio_section";
import { portfolioSectionRepository } from "../../../infra/database/repositories/portfolio_section.repository";

describe("Portfolio Section repository - Create", () => {
  it("Should successfully create a portfolio section", async () => {
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

    const baseSection = {
      portfolio_id: portfolio.id,
      type: "education" as PortfolioSectionType,
      is_active: true,
    };

    const sectionOrError = await portfolioSectionRepository.create({
      portfolio_id: baseSection.portfolio_id,
      type: baseSection.type,
      is_active: baseSection.is_active,
    });

    if (sectionOrError.isFailure()) {
      throw new Error(sectionOrError.value.message);
    }

    const section = sectionOrError.value;
    expect(section).toEqual({
      id: expect.any(String),
      portfolio_id: baseSection.portfolio_id,
      is_active: baseSection.is_active,
      type: baseSection.type,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
