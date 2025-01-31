import z from "zod";
import { userSchema } from "./user.schema";

export const postUserSchema = z.object({
  body: userSchema.pick({ name: true, email: true }),
});
