import z from "zod";

export const getPortfolioByUsernameSchema = z.object({
  params: z.object({
    username: z.string(),
  }),
});
