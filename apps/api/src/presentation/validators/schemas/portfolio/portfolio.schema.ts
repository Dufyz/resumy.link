import z from "zod";

export const portfolioSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  username: z.string(),
  title: z.string(),
  bio: z.string().nullable(),
  avatar_path: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});
