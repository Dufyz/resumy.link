import z from "zod";

export const portfolioSectionItemSchema = z.object({
  id: z.number(),
  portfolio_id: z.number(),
  portfolio_section_id: z.number(),
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});
