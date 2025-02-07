export type PortfolioSectionItem = {
  id: number;
  portfolio_id: number;
  portfolio_section_id: number;
  is_active: boolean;
  metadata:
    | PortfolioSectionItemEducation
    | PortfolioSectionItemExperience
    | PortfolioSectionItemCourse
    | PortfolioSectionItemCertification
    | PortfolioSectionItemProject
    | PortfolioSectionItemLanguage;
  created_at: Date;
  updated_at: Date;
};

export type PortfolioSectionItemEducation = {
  type: "education";
  title: string;
  description: string | null;
  organization: string;
  start_date: Date;
  end_date: Date | null;
};

export type PortfolioSectionItemExperience = {
  type: "experience";
  title: string;
  description: string | null;
  organization: string;
  start_date: Date;
  end_date: Date | null;
};

export type PortfolioSectionItemCourse = {
  type: "course";
  title: string;
  description: string | null;
  organization: string;
  start_date: Date;
  end_date: Date | null;
};

export type PortfolioSectionItemCertification = {
  type: "certification";
  title: string;
  description: string | null;
  organization: string;
  start_date: Date;
  end_date: Date | null;
};

export type PortfolioSectionItemProject = {
  type: "project";
  title: string;
  description: string | null;
  url: string | null;
  skills: string[];
};

export type PortfolioSectionItemLanguage = {
  type: "language";
  title: string;
  description: string | null;
  level: "beginner" | "intermediate" | "advanced" | "native";
};
