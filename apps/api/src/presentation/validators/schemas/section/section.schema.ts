import z from "zod";

export const sectionSchema = z.object({
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
  created_at: z.date(),
  updated_at: z.date(),
});
