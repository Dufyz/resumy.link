import z from "zod";

export const portfolioSectionSchema = z.object({
  id: z.coerce.number(),
  portfolio_id: z.coerce.number(),
  is_active: z.boolean(),
  type: z.enum([
    "education",
    "experience",
    "certification",
    "course",
    "project",
    "language",
  ]),
  title: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
