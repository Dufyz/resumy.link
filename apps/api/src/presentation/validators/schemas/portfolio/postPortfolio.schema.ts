import z from "zod";
import { portfolioSchema } from "./portfolio.schema";

export const postPortfolioSchema = z.object({
  body: portfolioSchema.pick({ name: true, user_id: true }),
});
