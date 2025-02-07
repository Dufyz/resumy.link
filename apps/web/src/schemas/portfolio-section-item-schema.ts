import { z } from "zod";

export const portfolioSectionItemEducationSchema = z.object({
  type: z.literal("education"),
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  description: z.string().nullable(),
  organization: z
    .string()
    .min(3, "A organização deve ter no mínimo 3 caracteres"),
  start_date: z.date(),
  end_date: z.date().nullable(),
});

export const portfolioSectionItemExperienceSchema = z.object({
  type: z.literal("experience"),
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  description: z.string().nullable(),
  organization: z
    .string()
    .min(3, "A organização deve ter no mínimo 3 caracteres"),
  start_date: z.date(),
  end_date: z.date().nullable(),
});

export const portfolioSectionItemCourseSchema = z.object({
  type: z.literal("course"),
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  description: z.string().nullable(),
  organization: z
    .string()
    .min(3, "A organização deve ter no mínimo 3 caracteres"),
  start_date: z.date(),
  end_date: z.date().nullable(),
});

export const portfolioSectionItemCertificationSchema = z.object({
  type: z.literal("certification"),
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  description: z.string().nullable(),
  organization: z
    .string()
    .min(3, "A organização deve ter no mínimo 3 caracteres"),
  start_date: z.date(),
  end_date: z.date().nullable(),
});

export const portfolioSectionItemProjectSchema = z.object({
  type: z.literal("project"),
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  description: z.string().nullable(),
  url: z.string().nullable(),
  skills: z.array(z.string()),
});

export const portfolioSectionItemLanguageSchema = z.object({
  type: z.literal("language"),
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  description: z.string().nullable(),
  level: z.enum(["beginner", "intermediate", "advanced", "native"]),
});

export const portfolioSectionItemSchema = z.object({
  id: z.coerce.number(),
  portfolio_id: z.coerce.number(),
  portfolio_section_id: z.coerce.number(),
  is_active: z.boolean(),
  metadata: z.union([
    portfolioSectionItemEducationSchema,
    portfolioSectionItemExperienceSchema,
    portfolioSectionItemCourseSchema,
    portfolioSectionItemCertificationSchema,
    portfolioSectionItemProjectSchema,
    portfolioSectionItemLanguageSchema,
  ]),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const createPortfolioSectionItemSchema = portfolioSectionItemSchema.pick(
  {
    portfolio_id: true,
    portfolio_section_id: true,
    is_active: true,
    metadata: true,
  }
);

export const updatePortfolioSectionItemSchema = portfolioSectionItemSchema
  .pick({
    is_active: true,
    metadata: true,
  })
  .partial();

export type CreatePortfolioSectionItemSchema = z.infer<
  typeof createPortfolioSectionItemSchema
>;

export type UpdatePortfolioSectionItemSchema = z.infer<
  typeof updatePortfolioSectionItemSchema
>;
