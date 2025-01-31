import { Router } from "express";

import * as SectionController from "../controllers/section.controller";
import { validate } from "../middlewares/zod.middleware";
import {
  deleteSectionSchema,
  patchSectionSchema,
  postSectionSchema,
} from "../validators/schemas/section";

const sectionRoutes = Router();

sectionRoutes.post(
  "/sections",
  validate(postSectionSchema),
  SectionController.handlePostSection
);

sectionRoutes.patch(
  "/sections/:id",
  validate(patchSectionSchema),
  SectionController.handlePatchSection
);

sectionRoutes.delete(
  "/sections/:id",
  validate(deleteSectionSchema),
  SectionController.handleDeleteSection
);

export default sectionRoutes;
