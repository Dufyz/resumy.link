import z from "zod";
import { portfolioSchema } from "./portfolio.schema";

export const patchPortfolioSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: portfolioSchema
    .pick({
      username: true,
      title: true,
      bio: true,
      avatar_path: true,
      metadata: true,
    })
    .partial(),
});
