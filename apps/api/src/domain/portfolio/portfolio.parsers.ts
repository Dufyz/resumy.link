import { Portfolio } from "./portfolio.entities";

export const parsePortfolioFromDB = (portfolio: Portfolio): Portfolio => ({
  id: portfolio.id,
  user_id: portfolio.user_id,
  username: portfolio.username,
  title: portfolio.title,
  bio: portfolio.bio,
  avatar_path: portfolio.avatar_path,
  metadata: portfolio.metadata,
  created_at: portfolio.created_at,
  updated_at: portfolio.updated_at,
});
