import z from "zod";
import { userSchema } from "../user/user.schema";
import { portfolioSchema } from "../portfolio";

export const postOnboardingSchema = z.object({
  body: z.object({
    user: userSchema.pick({ name: true, email: true }),
    portfolio: portfolioSchema.pick({
      username: true,
      title: true,
      bio: true,
      avatar_path: true,
    }),
  }),
});
