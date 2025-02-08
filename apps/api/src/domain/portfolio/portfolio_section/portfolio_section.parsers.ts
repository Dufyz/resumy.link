import { PortfolioSection } from "./portfolio_section.entities";

export const parsePortfolioSectionFromDB = (
  section: PortfolioSection
): PortfolioSection => ({
  id: section.id,
  portfolio_id: section.portfolio_id,
  is_active: section.is_active,
  type: section.type,
  title: section.title,
  index: section.index,
  created_at: section.created_at,
  updated_at: section.updated_at,
});
