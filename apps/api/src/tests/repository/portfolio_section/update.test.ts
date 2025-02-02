import { v4 } from "uuid";
import { portfolioRepository } from "../../../infra/database/repositories/portfolio.repository";
import { userRepository } from "../../../infra/database/repositories/user.repository";
import { PortfolioSectionType } from "../../../domain/portfolio/portfolio_section";
import { portfolioSectionRepository } from "../../../infra/database/repositories/portfolio_section.repository";

describe("Portfolio Section repository - Update", () => {
  it("Should successfully update a portfolio section", async () => {
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

    const portfolioOrError = await portfolioRepository.create({
      user_id: basePortfolio.user_id,
      name: basePortfolio.name,
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

    const createdSectionOrError = await portfolioSectionRepository.create({
      portfolio_id: baseSection.portfolio_id,
      type: baseSection.type,
      is_active: baseSection.is_active,
    });

    if (createdSectionOrError.isFailure()) {
      throw new Error(createdSectionOrError.value.message);
    }

    const sectionOrError = await portfolioSectionRepository.update(
      createdSectionOrError.value.id,
      {
        type: "experience" as PortfolioSectionType,
        is_active: false,
      }
    );

    const section = sectionOrError.value;
    expect(section).toEqual({
      id: expect.any(String),
      portfolio_id: baseSection.portfolio_id,
      type: "experience",
      is_active: false,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
