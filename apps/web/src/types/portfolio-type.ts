import { PortfolioSectionItem } from "./portfolio-section-item-type";
import { PortfolioSection } from "./portfolio-section-type";

export type Portfolio = {
  id: number;
  user_id: number;
  username: string;
  title: string;
  bio: string | null;
  avatar_path: string | null;
  metadata: {
    links: {
      type: PortfolioLinkType;
      url: string;
    }[];
  } | null;
  created_at: Date;
  updated_at: Date;

  portfolio_sections?: PortfolioSection[];
  portfolio_section_items?: PortfolioSectionItem[];
};

export type PortfolioLinkType =
  | "instagram"
  | "linkedin"
  | "twitter"
  | "tiktok"
  | "youtube"
  | "github"
  | "website";
