import { Router } from "express";

import * as SectionController from "../controllers/portfolio_section.controller";
import { validate } from "../middlewares/zod.middleware";
import {
  deletePortfolioSectionSchema,
  patchPortfolioSectionSchema,
  postPortfolioSectionSchema,
} from "../validators/schemas/portfolio_section";

const portfolioSectionRoutes = Router();

portfolioSectionRoutes.post(
  "/portfolio-sections",
  validate(postPortfolioSectionSchema),
  SectionController.handlePostPortfolioSection
);

portfolioSectionRoutes.patch(
  "/portfolio-sections/:id",
  validate(patchPortfolioSectionSchema),
  SectionController.handlePatchPortfolioSection
);

portfolioSectionRoutes.delete(
  "/portfolio-sections/:id",
  validate(deletePortfolioSectionSchema),
  SectionController.handleDeletePortfolioSection
);

export default portfolioSectionRoutes;
