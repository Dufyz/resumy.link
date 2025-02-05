import { z } from "zod";

export const userSchema = z.object({
  id: z.coerce.number(),
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter menos de 50 caracteres"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "Email é obrigatório"),
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
