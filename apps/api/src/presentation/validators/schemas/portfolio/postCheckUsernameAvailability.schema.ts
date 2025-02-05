import z from "zod";
import { portfolioSchema } from "./portfolio.schema";

export const postCheckUsernameAvailabilitySchema = z.object({
  body: portfolioSchema.pick({
    username: true,
  }),
});
