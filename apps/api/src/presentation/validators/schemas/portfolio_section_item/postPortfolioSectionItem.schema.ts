import z from "zod";
import { portfolioSectionItemSchema } from "./portfolioSectionItem.schema";

export const postPortfolioSectionItemSchema = z.object({
  body: portfolioSectionItemSchema.pick({
    portfolio_id: true,
    portfolio_section_id: true,
  }),
});
