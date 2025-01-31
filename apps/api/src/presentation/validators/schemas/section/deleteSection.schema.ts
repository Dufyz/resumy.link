import z from "zod";

export const deleteSectionSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
