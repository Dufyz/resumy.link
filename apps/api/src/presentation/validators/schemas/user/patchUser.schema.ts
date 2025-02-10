import z from "zod";
import { userSchema } from "./user.schema";

export const patchUserschema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: userSchema
    .pick({ name: true, email: true, avatar_path: true })
    .partial(),
});
