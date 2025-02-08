import { PortfolioSectionItem } from "./portfolio-section-item-type";

export type PortfolioSectionType =
  | "education"
  | "experience"
  | "project"
  | "certification"
  | "language"
  | "course";

export type PortfolioSection = {
  id: number;
  portfolio_id: number;
  is_active: boolean;
  title: string;
  type: PortfolioSectionType;
  index: number;
  created_at: Date;
  updated_at: Date;

  portfolio_section_items?: PortfolioSectionItem[];
};
