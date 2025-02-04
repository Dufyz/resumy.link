import z from "zod";

export const getPortfolioSectionsByPortfolioIdSchema = z.object({
  params: z.object({
    portfolio_id: z.coerce.number(),
  }),
});
