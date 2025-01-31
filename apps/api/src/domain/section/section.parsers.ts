import { Section } from "./section.entities";

export const parseSectionFromDB = (section: Section): Section => ({
  id: section.id,
  portfolio_id: section.portfolio_id,
  is_active: section.is_active,
  type: section.type,
  created_at: section.created_at,
  updated_at: section.updated_at,
});
