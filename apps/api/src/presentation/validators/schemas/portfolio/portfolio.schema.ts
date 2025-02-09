import z from "zod";

export const portfolioSchema = z.object({
  id: z.coerce.number(),
  user_id: z.coerce.number(),
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(30, "O nome de usuário deve ter menos de 30 caracteres")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "O nome de usuário só pode conter letras, números, sublinhados e hífens"
    ),
  title: z
    .string()
    .min(2, "O título deve ter pelo menos 2 caracteres")
    .max(50, "O título deve ter menos de 50 caracteres"),
  bio: z.string().trim().nullable(),
  avatar_path: z.string().nullable(),
  is_active: z.boolean(),
  metadata: z
    .object({
      links: z.array(
        z.object({
          type: z.enum([
            "instagram",
            "linkedin",
            "twitter",
            "tiktok",
            "youtube",
            "github",
            "website",
          ]),
          url: z.string().url("URL inválida"),
        })
      ),
    })
    .nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
