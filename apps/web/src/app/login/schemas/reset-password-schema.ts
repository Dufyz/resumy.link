import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: "As senhas não conferem" };
    }

    return {};
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
