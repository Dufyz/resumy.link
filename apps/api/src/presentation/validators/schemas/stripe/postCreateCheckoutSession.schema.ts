import z from "zod";

export const postCreateCheckoutSessionSchema = z.object({
  body: z.object({
    email: z.string().email(),
    price: z.enum(["standard", "lifetime"]),
  }),
});
