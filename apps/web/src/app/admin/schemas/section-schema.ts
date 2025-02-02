import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  portfolio_id: z.number(),
  is_active: z.boolean(),
  title: z.string(),
  type: z.enum([
    "education",
    "experience",
    "project",
    "certification",
    "language",
    "course",
    "custom",
  ]),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createSectionSchema = sectionSchema.pick({
  portfolio_id: true,
  is_active: true,
  title: true,
  type: true,
});

export type CreateSectionSchema = z.infer<typeof createSectionSchema>;
