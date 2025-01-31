export type SectionType =
  | "education"
  | "experience"
  | "project"
  | "certification"
  | "language"
  | "social";

export type Section = {
  id: number;
  portfolio_id: number;
  is_active: boolean;
  type: SectionType;
  created_at: Date;
  updated_at: Date;
};
