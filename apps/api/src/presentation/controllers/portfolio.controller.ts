import z from "zod";
import { Request, Response } from "express";
import {
  createPortfolio,
  findPortfolioById,
  findPortfolioByUserame,
  updatePortfolio,
} from "../../application/usecases/portfolio";
import { portfolioRepository } from "../../infra/database/repositories/portfolio.repository";
import {
  getPortfolioByIdSchema,
  getPortfolioByUsernameSchema,
  patchPortfolioSchema,
  postPortfolioSchema,
} from "../validators/schemas/portfolio";
import { getPortfolioByUserIdSchema } from "../validators/schemas/portfolio/getPortfolioByUserId.schema";
import { findPortfolioByUserId } from "../../application/usecases/portfolio/findPortfolioByUserId.usecase";

export async function handleGetPortfolioById(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof getPortfolioByIdSchema
  >["params"];

  const portfolioOrError = await findPortfolioById(portfolioRepository)(id);

  if (portfolioOrError.isFailure()) {
    res.status(404).json({ message: portfolioOrError.value.message });
    return;
  }

  const portfolio = portfolioOrError.value;

  if (portfolio === null) {
    res.status(404).json({ portfolio, message: "Portfolio not found" });
    return;
  }

  res.status(200).json({
    portfolio,
    message: "Portfolio found",
  });
}

export async function handleGetPortfolioByUsername(
  req: Request,
  res: Response
) {
  const { username } = req.params as unknown as z.infer<
    typeof getPortfolioByUsernameSchema
  >["params"];

  const portfolioOrError = await findPortfolioByUserame(portfolioRepository)(
    username
  );

  if (portfolioOrError.isFailure()) {
    res.status(404).json({ message: portfolioOrError.value.message });
    return;
  }

  const portfolio = portfolioOrError.value;

  if (portfolio === null) {
    res.status(404).json({ portfolio, message: "Portfolio not found" });
    return;
  }

  res.status(200).json({
    portfolio,
    message: "Portfolio found",
  });
}

export async function handleGetPortfolioByUserId(req: Request, res: Response) {
  const { user_id } = req.params as unknown as z.infer<
    typeof getPortfolioByUserIdSchema
  >["params"];

  const portfolioOrError = await findPortfolioByUserId(portfolioRepository)(
    user_id
  );

  if (portfolioOrError.isFailure()) {
    res.status(404).json({ message: portfolioOrError.value.message });
    return;
  }

  const portfolio = portfolioOrError.value;

  if (portfolio === null) {
    res.status(404).json({ portfolio, message: "Portfolio not found" });
    return;
  }

  res.status(200).json({
    portfolio,
    message: "Portfolio found",
  });
}

export async function handlePostPortfolio(req: Request, res: Response) {
  const { user_id, username, title, bio, avatar_path } =
    req.body as unknown as z.infer<typeof postPortfolioSchema>["body"];

  const portfolioOrError = await createPortfolio(portfolioRepository)({
    user_id,
    username,
    title,
    bio,
    avatar_path,
  });

  if (portfolioOrError.isFailure()) {
    res.status(400).json({ message: portfolioOrError.value.message });
    return;
  }

  const portfolio = portfolioOrError.value;
  res.status(201).json({
    portfolio,
    message: "Portfolio created",
  });
}

export async function handlePatchPortfolio(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchPortfolioSchema
  >["params"];
  const { title, bio, avatar_path } = req.body as unknown as z.infer<
    typeof patchPortfolioSchema
  >["body"];

  const portfolioOrError = await updatePortfolio(portfolioRepository)(id, {
    title,
    bio,
    avatar_path,
  });

  if (portfolioOrError.isFailure()) {
    res.status(404).json({ message: portfolioOrError.value.message });
    return;
  }

  const portfolio = portfolioOrError.value;
  res.status(200).json({
    portfolio,
    message: "Portfolio updated",
  });
}
