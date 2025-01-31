import { Portfolio } from "./portfolio.entities";

export const parsePortfolioFromDB = (portfolio: Portfolio): Portfolio => ({
  id: portfolio.id,
  user_id: portfolio.user_id,
  name: portfolio.name,
  created_at: portfolio.created_at,
  updated_at: portfolio.updated_at,
});
