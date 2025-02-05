import z from "zod";
import { createUser } from "../../application/usecases/user";
import { userRepository } from "../../infra/database/repositories/user.repository";
import { Request, Response } from "express";

import { postOnboardingSchema } from "../validators/schemas/onboarding/postOnboarding.schema";
import { createPortfolio } from "../../application/usecases/portfolio";
import { portfolioRepository } from "../../infra/database/repositories/portfolio.repository";

export async function handlePostOnboarding(req: Request, res: Response) {
  const { user: userData, portfolio: portfolioData } =
    req.body as unknown as z.infer<typeof postOnboardingSchema>["body"];

  const userOrError = await createUser(userRepository)({
    name: userData.name,
    email: userData.email,
  });

  if (userOrError.isFailure()) {
    res.status(400).json({ message: userOrError.value.message });
    return;
  }

  const user = userOrError.value;

  const portfolioOrError = await createPortfolio(portfolioRepository)({
    user_id: user.id,
    username: portfolioData.username,
    title: portfolioData.title,
    bio: portfolioData.bio,
    avatar_path: portfolioData.avatar_path,
  });

  if (portfolioOrError.isFailure()) {
    res.status(400).json({ message: portfolioOrError.value.message });
    return;
  }

  const portfolio = portfolioOrError.value;

  res.status(201).json({
    user,
    portfolio,
    message: "Onboarding done successfully",
  });
}
