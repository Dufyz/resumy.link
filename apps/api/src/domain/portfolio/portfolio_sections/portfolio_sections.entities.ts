export type PortfolioSectionType =
  | "education"
  | "experience"
  | "project"
  | "certification"
  | "language"
  | "social";

export type PortfolioSection = {
  id: number;
  portfolio_id: number;
  is_active: boolean;
  type: PortfolioSectionType;
  created_at: Date;
  updated_at: Date;
};
