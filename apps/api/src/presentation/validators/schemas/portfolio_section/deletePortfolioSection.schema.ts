import z from "zod";

export const deletePortfolioSectionSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
