import z from "zod";
import { sectionSchema } from "./section.schema";

export const postSectionSchema = z.object({
  body: sectionSchema.pick({ portfolio_id: true, type: true, is_active: true }),
});
