import z from "zod";

export const getUserByUsernameSchema = z.object({
  params: z.object({
    username: z.string(),
  }),
});
