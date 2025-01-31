import { Router } from "express";

import * as PortfolioController from "../controllers/portfolio.controller";
import { validate } from "../middlewares/zod.middleware";
import {
  getPortfolioByIdSchema,
  getPortfolioByNameSchema,
  patchPortfolioSchema,
  postPortfolioSchema,
} from "../validators/schemas/portfolio";

const portfolioRoutes = Router();

portfolioRoutes.get(
  "/portfolios/:id",
  validate(getPortfolioByIdSchema),
  PortfolioController.handleGetPortfolioById
);

portfolioRoutes.get(
  "/portfolios/name/:name",
  validate(getPortfolioByNameSchema),
  PortfolioController.handleGetPortfolioByName
);

portfolioRoutes.post(
  "/portfolios",
  validate(postPortfolioSchema),
  PortfolioController.handlePostPortfolio
);

portfolioRoutes.patch(
  "/portfolios/:id",
  validate(patchPortfolioSchema),
  PortfolioController.handlePatchPortfolio
);

export default portfolioRoutes;
