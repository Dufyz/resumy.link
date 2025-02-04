import z from "zod";

export const getPortfolioByUserIdSchema = z.object({
  params: z.object({
    user_id: z.coerce.number(),
  }),
});
