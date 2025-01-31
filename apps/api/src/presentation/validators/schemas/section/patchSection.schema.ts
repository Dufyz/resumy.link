import z from "zod";
import { sectionSchema } from "./section.schema";

export const patchSectionSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: sectionSchema.pick({ type: true, is_active: true }).partial(),
});
