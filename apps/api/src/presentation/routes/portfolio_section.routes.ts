import { Router } from "express";

import * as PortfolioSectionController from "../controllers/portfolio_section.controller";
import { validate } from "../middlewares/zod.middleware";
import {
  postPortfolioSectionSchema,
  patchPortfolioSectionSchema,
  deletePortfolioSectionSchema,
  getPortfolioSectionsByPortfolioIdSchema,
} from "../validators/schemas/portfolio_section";

const portfolioSectionRoutes = Router();

portfolioSectionRoutes.get(
  "/portfolio-sections/portfolio/:portfolio_id",
  validate(getPortfolioSectionsByPortfolioIdSchema),
  PortfolioSectionController.handleGetPortfolioSectionsByPortfolioId
);

portfolioSectionRoutes.post(
  "/portfolio-sections",
  validate(postPortfolioSectionSchema),
  PortfolioSectionController.handlePostPortfolioSection
);

portfolioSectionRoutes.patch(
  "/portfolio-sections/:id",
  validate(patchPortfolioSectionSchema),
  PortfolioSectionController.handlePatchPortfolioSection
);

portfolioSectionRoutes.delete(
  "/portfolio-sections/:id",
  validate(deletePortfolioSectionSchema),
  PortfolioSectionController.handleDeletePortfolioSection
);

export default portfolioSectionRoutes;
