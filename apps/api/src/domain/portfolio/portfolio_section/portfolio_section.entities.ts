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
  type: PortfolioSectionType;
  title: string;
  index: number;
  created_at: Date;
  updated_at: Date;
};
