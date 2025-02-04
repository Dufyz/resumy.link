import { z } from "zod";

export const portfolioSectionSchema = z.object({
  id: z.coerce.number(),
  portfolio_id: z.coerce.number(),
  is_active: z.boolean(),
  title: z.string(),
  type: z.enum([
    "education",
    "experience",
    "project",
    "certification",
    "language",
    "course",
  ]),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createPortfolioSectionSchema = portfolioSectionSchema.pick({
  portfolio_id: true,
  is_active: true,
  title: true,
  type: true,
});

export const updatePortfolioSectionSchema = portfolioSectionSchema
  .pick({
    portfolio_id: true,
    is_active: true,
    title: true,
    type: true,
  })
  .partial();

export type CreatePortfolioSectionSchema = z.infer<
  typeof createPortfolioSectionSchema
>;
export type UpdatePortfolioSectionSchema = z.infer<
  typeof updatePortfolioSectionSchema
>;
