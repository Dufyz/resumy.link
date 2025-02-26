import { z } from "zod";

export const portfolioSocialSchema = z.object({
  portfolio_id: z.coerce.number(),
  username: z.string(),
  type: z.enum(["instagram", "youtube", "mail"]),
});
