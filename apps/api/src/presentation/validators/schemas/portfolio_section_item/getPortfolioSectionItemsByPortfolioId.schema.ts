import z from "zod";

export const getPortfolioSectionItemsByPortfolioIdSchema = z.object({
  params: z.object({
    portfolio_id: z.coerce.number(),
  }),
});
