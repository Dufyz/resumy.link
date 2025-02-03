import z from "zod";
import { portfolioSchema } from "./portfolio.schema";

export const postPortfolioSchema = z.object({
  body: portfolioSchema.pick({
    user_id: true,
    username: true,
    title: true,
    bio: true,
    avatar_path: true,
  }),
});
