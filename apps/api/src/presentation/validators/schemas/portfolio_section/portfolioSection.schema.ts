import z from "zod";

export const portfolioSectionSchema = z.object({
  id: z.number(),
  portfolio_id: z.number(),
  is_active: z.boolean(),
  type: z.enum([
    "education",
    "experience",
    "project",
    "certification",
    "language",
    "social",
  ]),
  title: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});
