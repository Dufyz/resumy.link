import z from "zod";
import { portfolioSectionSchema } from "./portfolioSection.schema";

export const patchPortfolioSectionSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: portfolioSectionSchema
    .pick({ type: true, is_active: true, title: true, index: true })
    .partial(),
});
