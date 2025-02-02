import { z } from "zod";

export const sectionItemSchema = z.object({
  id: z.number(),
  section_id: z.number(),
  title: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createSectionItemSchema = sectionItemSchema.pick({
  section_id: true,
  title: true,
});

export type CreateSectionItemSchema = z.infer<typeof createSectionItemSchema>;
