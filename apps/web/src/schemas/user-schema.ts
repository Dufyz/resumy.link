import { z } from "zod";

export const userSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  email: z.string().email("Digite um email válido"),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
});

export const updateUserSchema = userSchema
  .pick({
    name: true,
    email: true,
  })
  .partial();

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
