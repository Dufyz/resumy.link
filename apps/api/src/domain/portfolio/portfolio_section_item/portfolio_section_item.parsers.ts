import { PortfolioSectionItem } from "./portfolio_section_item.entities";

export const parsePortfolioSectionItemFromDB = (
  portfolioSectionItem: PortfolioSectionItem
): PortfolioSectionItem => ({
  id: portfolioSectionItem.id,
  portfolio_id: portfolioSectionItem.portfolio_id,
  portfolio_section_id: portfolioSectionItem.portfolio_section_id,
  is_active: portfolioSectionItem.is_active,
  created_at: portfolioSectionItem.created_at,
  updated_at: portfolioSectionItem.updated_at,
});
