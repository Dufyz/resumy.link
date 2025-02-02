import z from "zod";

export const deletePortfolioSectionItemSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
