import { Router } from "express";

import * as PortfolioSectionItemController from "../controllers/portfolio_section_item.controller";
import { validate } from "../middlewares/zod.middleware";
import {
  postPortfolioSectionItemSchema,
  patchPortfolioSectionItemSchema,
  deletePortfolioSectionItemSchema,
  getPortfolioSectionItemsByPortfolioIdSchema,
} from "../validators/schemas/portfolio_section_item";

const portfolioSectionItemsRoutes = Router();

portfolioSectionItemsRoutes.get(
  "/portfolio-section-items/portfolio/:portfolio_id",
  validate(getPortfolioSectionItemsByPortfolioIdSchema),
  PortfolioSectionItemController.handleGetPortfolioSectionItemsByPortfolioId
);

portfolioSectionItemsRoutes.post(
  "/portfolio-section-items",
  validate(postPortfolioSectionItemSchema),
  PortfolioSectionItemController.handlePostPortfolioSectionItem
);

portfolioSectionItemsRoutes.patch(
  "/portfolio-section-items/:id",
  validate(patchPortfolioSectionItemSchema),
  PortfolioSectionItemController.handlePatchPortfolioSectionItem
);

portfolioSectionItemsRoutes.delete(
  "/portfolio-section-items/:id",
  validate(deletePortfolioSectionItemSchema),
  PortfolioSectionItemController.handleDeletePortfolioSectionItem
);

export default portfolioSectionItemsRoutes;
