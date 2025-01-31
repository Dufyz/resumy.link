import z from "zod";
import { portfolioSchema } from "./portfolio.schema";

export const patchPortfolioSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: portfolioSchema.pick({ name: true }).partial(),
});
