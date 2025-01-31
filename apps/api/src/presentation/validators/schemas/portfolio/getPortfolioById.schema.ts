import z from "zod";

export const getPortfolioByIdSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
