import z from "zod";

export const postFileSchema = z.object({
  file_path: z.string(),
});

export type PostFileSchema = z.infer<typeof postFileSchema>;
