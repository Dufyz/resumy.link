import z from "zod";
import { Request, Response } from "express";
import {
  deletePortfolioSectionSchema,
  patchPortfolioSectionSchema,
  postPortfolioSectionSchema,
} from "../validators/schemas/portfolio_section";
import {
  createPortfolioSection,
  deletePortfolioSection,
  updatePortfolioSection,
} from "../../application/usecases/portfolio/portfolio_section";
import { sectionRepository } from "../../infra/database/repositories/section.repository";

export async function handlePostPortfolioSection(req: Request, res: Response) {
  const { portfolio_id, type, is_active } = req.body as unknown as z.infer<
    typeof postPortfolioSectionSchema
  >["body"];

  const sectionOrError = await createPortfolioSection(sectionRepository)({
    portfolio_id,
    type,
    is_active,
  });

  if (sectionOrError.isFailure()) {
    res.status(400).json({ message: sectionOrError.value.message });
    return;
  }

  const section = sectionOrError.value;
  res.status(201).json({
    section,
    message: "Section created",
  });
}

export async function handlePatchPortfolioSection(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchPortfolioSectionSchema
  >["params"];
  const { type, is_active } = req.body as unknown as z.infer<
    typeof patchPortfolioSectionSchema
  >["body"];

  const sectionOrError = await updatePortfolioSection(sectionRepository)(id, {
    type,
    is_active,
  });

  if (sectionOrError.isFailure()) {
    res.status(404).json({ message: sectionOrError.value.message });
    return;
  }

  const section = sectionOrError.value;
  res.status(200).json({
    section,
    message: "Section updated",
  });
}

export async function handleDeletePortfolioSection(
  req: Request,
  res: Response
) {
  const { id } = req.params as unknown as z.infer<
    typeof deletePortfolioSectionSchema
  >["params"];

  const sectionOrError = await deletePortfolioSection(sectionRepository)(id);

  if (sectionOrError.isFailure()) {
    res.status(404).json({ message: sectionOrError.value.message });
    return;
  }

  res.status(200).json({
    message: "Section deleted",
  });
}
