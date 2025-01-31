import z from "zod";

export const portfolioSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});
