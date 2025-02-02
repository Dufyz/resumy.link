export type Portfolio = {
  id: number;
  user_id: number;
  username: string;
  name: string;
  bio: string | null;
  avatar_path: string | null;
  created_at: Date;
  updated_at: Date;
};

export type PortfolioSocial = {};
