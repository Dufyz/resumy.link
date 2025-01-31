import z from "zod";
import { Request, Response } from "express";
import {
  createPortfolio,
  findPortfolioById,
  findPortfolioByName,
  updatePortfolio,
} from "../../application/usecases/portfolio";
import { portfolioRepository } from "../../infra/database/repositories/portfolio.repository";
import {
  getPortfolioByIdSchema,
  getPortfolioByNameSchema,
  patchPortfolioSchema,
  postPortfolioSchema,
} from "../validators/schemas/portfolio";

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

export async function handleGetPortfolioByName(req: Request, res: Response) {
  const { name } = req.params as unknown as z.infer<
    typeof getPortfolioByNameSchema
  >["params"];

  const portfolioOrError = await findPortfolioByName(portfolioRepository)(name);

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
  const { name, user_id } = req.body as unknown as z.infer<
    typeof postPortfolioSchema
  >["body"];

  const portfolioOrError = await createPortfolio(portfolioRepository)({
    user_id,
    name,
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
  const { name } = req.body as unknown as z.infer<
    typeof patchPortfolioSchema
  >["body"];

  const portfolioOrError = await updatePortfolio(portfolioRepository)(id, {
    name,
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
