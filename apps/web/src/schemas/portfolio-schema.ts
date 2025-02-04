import { z } from "zod";

export const portfolioSchema = z.object({
  id: z.coerce.number(),
  user_id: z.number(),
  username: z.string(),
  title: z.string(),
  bio: z.string().nullable(),
  avatar_path: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createPortfolioSchema = portfolioSchema.pick({
  user_id: true,
  username: true,
  title: true,
  bio: true,
  avatar_path: true,
});

export const updatePortfolioSchema = portfolioSchema
  .pick({
    username: true,
    title: true,
    bio: true,
    avatar_path: true,
  })
  .partial();

export type CreatePortfolioSchema = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioSchema = z.infer<typeof updatePortfolioSchema>;
