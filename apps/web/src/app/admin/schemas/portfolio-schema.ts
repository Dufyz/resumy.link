import { z } from "zod";

export const portfolioSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  name: z.string(),
  username: z.string(),
  bio: z.string().nullable(),
  avatar_path: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const editPortfolioSchema = portfolioSchema
  .pick({
    name: true,
    bio: true,
    avatar_path: true,
  })
  .partial();

export type EditPortfolioSchema = z.infer<typeof editPortfolioSchema>;
