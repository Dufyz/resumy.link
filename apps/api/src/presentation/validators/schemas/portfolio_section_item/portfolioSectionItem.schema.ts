import z from "zod";

const portfolioSectionItemEducationSchema = z.object({
  type: z.literal("education"),
  title: z.string(),
  description: z.string(),
  organization: z.string(),
  start_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  end_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().nullable()
  ),
});

const portfolioSectionItemExperienceSchema = z.object({
  type: z.literal("experience"),
  title: z.string(),
  description: z.string(),
  organization: z.string(),
  start_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  end_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().nullable()
  ),
});

const portfolioSectionItemCourseSchema = z.object({
  type: z.literal("course"),
  title: z.string(),
  description: z.string(),
  organization: z.string(),
  start_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  end_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().nullable()
  ),
});

const portfolioSectionItemCertificationSchema = z.object({
  type: z.literal("certification"),
  title: z.string(),
  description: z.string(),
  organization: z.string(),
  start_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  end_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().nullable()
  ),
});

const portfolioSectionItemProjectSchema = z.object({
  type: z.literal("project"),
  title: z.string(),
  description: z.string(),
  url: z.string().nullable(),
  skills: z.array(z.string()),
});

const portfolioSectionItemLanguageSchema = z.object({
  type: z.literal("language"),
  title: z.string(),
  description: z.string(),
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
