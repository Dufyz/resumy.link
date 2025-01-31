import z from "zod";

export const getPortfolioByNameSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
});
