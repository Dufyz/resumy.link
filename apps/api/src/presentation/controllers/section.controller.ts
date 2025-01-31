import z from "zod";
import { Request, Response } from "express";
import {
  deleteSectionSchema,
  patchSectionSchema,
  postSectionSchema,
} from "../validators/schemas/section";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../../application/usecases/section";
import { sectionRepository } from "../../infra/database/repositories/section.repository";

export async function handlePostSection(req: Request, res: Response) {
  const { portfolio_id, type, is_active } = req.body as unknown as z.infer<
    typeof postSectionSchema
  >["body"];

  const sectionOrError = await createSection(sectionRepository)({
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

export async function handlePatchSection(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchSectionSchema
  >["params"];
  const { type, is_active } = req.body as unknown as z.infer<
    typeof patchSectionSchema
  >["body"];

  const sectionOrError = await updateSection(sectionRepository)(id, {
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

export async function handleDeleteSection(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof deleteSectionSchema
  >["params"];

  const sectionOrError = await deleteSection(sectionRepository)(id);

  if (sectionOrError.isFailure()) {
    res.status(404).json({ message: sectionOrError.value.message });
    return;
  }

  res.status(200).json({
    message: "Section deleted",
  });
}
