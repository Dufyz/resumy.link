import z from "zod";
import { portfolioSectionSchema } from "./portfolioSection.schema";

export const postPortfolioSectionSchema = z.object({
  body: portfolioSectionSchema.pick({
    portfolio_id: true,
    type: true,
    is_active: true,
    title: true,
  }),
});
