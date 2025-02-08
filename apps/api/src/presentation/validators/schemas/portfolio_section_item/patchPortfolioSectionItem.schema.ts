import z from "zod";
import { portfolioSectionItemSchema } from "./portfolioSectionItem.schema";

export const patchPortfolioSectionItemSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: portfolioSectionItemSchema
    .pick({
      is_active: true,
      index: true,
      metadata: true,
    })
    .partial(),
});
