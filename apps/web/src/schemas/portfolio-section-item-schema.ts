import { z } from "zod";

export const portfolioSectionItemSchema = z.object({
  id: z.coerce.number(),
  portfolio_id: z.coerce.number(),
  portfolio_section_id: z.coerce.number(),
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createPortfolioSectionItemSchema = portfolioSectionItemSchema.pick(
  {
    portfolio_id: true,
    portfolio_section_id: true,
    is_active: true,
  }
);

export const updatePortfolioSectionItemSchema = portfolioSectionItemSchema.pick(
  {
    is_active: true,
  }
);

export type CreatePortfolioSectionItemSchema = z.infer<
  typeof createPortfolioSectionItemSchema
>;

export type UpdatePortfolioSectionItemSchema = z.infer<
  typeof updatePortfolioSectionItemSchema
>;
