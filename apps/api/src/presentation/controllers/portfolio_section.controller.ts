import z from "zod";
import { Request, Response } from "express";
import {
  deletePortfolioSectionSchema,
  getPortfolioSectionsByPortfolioIdSchema,
  patchPortfolioSectionSchema,
  postPortfolioSectionSchema,
} from "../validators/schemas/portfolio_section";
import {
  createPortfolioSection,
  deletePortfolioSection,
  updatePortfolioSection,
} from "../../application/usecases/portfolio/portfolio_section";
import { portfolioSectionRepository } from "../../infra/database/repositories/portfolio_section.repository";
import { listPortfolioSectionsByPortfolioId } from "../../application/usecases/portfolio/portfolio_section/listPortfolioSectionByPortfolioId.usecase";

export async function handleGetPortfolioSectionsByPortfolioId(
  req: Request,
  res: Response
) {
  const { portfolio_id } = req.params as unknown as z.infer<
    typeof getPortfolioSectionsByPortfolioIdSchema
  >["params"];

  const portfolioSectionsOrError = await listPortfolioSectionsByPortfolioId(
    portfolioSectionRepository
  )(portfolio_id);

  if (portfolioSectionsOrError.isFailure()) {
    res.status(400).json({ message: portfolioSectionsOrError.value.message });
    return;
  }

  const portfolioSections = portfolioSectionsOrError.value;
  res.status(201).json({
    portfolio_sections: portfolioSections,
  });
}

export async function handlePostPortfolioSection(req: Request, res: Response) {
  const { portfolio_id, type, is_active, title } =
    req.body as unknown as z.infer<typeof postPortfolioSectionSchema>["body"];

  const portfolioSectionOrError = await createPortfolioSection(
    portfolioSectionRepository
  )({
    portfolio_id,
    type,
    is_active,
    title,
  });

  if (portfolioSectionOrError.isFailure()) {
    res.status(400).json({ message: portfolioSectionOrError.value.message });
    return;
  }

  const portfolioSection = portfolioSectionOrError.value;
  res.status(201).json({
    portfolio_section: portfolioSection,
    message: "Portfolio Section created",
  });
}

export async function handlePatchPortfolioSection(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchPortfolioSectionSchema
  >["params"];
  const { type, is_active, title } = req.body as unknown as z.infer<
    typeof patchPortfolioSectionSchema
  >["body"];

  const portfolioSectionOrError = await updatePortfolioSection(
    portfolioSectionRepository
  )(id, {
    type,
    is_active,
    title,
  });

  if (portfolioSectionOrError.isFailure()) {
    res.status(404).json({ message: portfolioSectionOrError.value.message });
    return;
  }

  const portfolioSection = portfolioSectionOrError.value;
  res.status(200).json({
    portfolio_section: portfolioSection,
    message: "Portfolio Section updated",
  });
}

export async function handleDeletePortfolioSection(
  req: Request,
  res: Response
) {
  const { id } = req.params as unknown as z.infer<
    typeof deletePortfolioSectionSchema
  >["params"];

  const portfolioSectionOrError = await deletePortfolioSection(
    portfolioSectionRepository
  )(id);

  if (portfolioSectionOrError.isFailure()) {
    res.status(404).json({ message: portfolioSectionOrError.value.message });
    return;
  }

  res.status(200).json({
    message: "Portfolio Section deleted",
  });
}
