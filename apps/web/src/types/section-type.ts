export type SectionType =
  | "education"
  | "experience"
  | "project"
  | "certification"
  | "language"
  | "course"
  | "custom";

export type Section = {
  id: number;
  portfolio_id: number;
  is_active: boolean;
  title: string;
  type: SectionType;
  created_at: Date;
  updated_at: Date;
};

export type SectionItem = {
  id: string;
  created_at: Date;
  updated_at: Date;
};
