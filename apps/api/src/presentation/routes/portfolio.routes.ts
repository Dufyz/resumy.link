import { Router } from "express";

import * as PortfolioController from "../controllers/portfolio.controller";
import { validate } from "../middlewares/zod.middleware";
import {
  getPortfolioByIdSchema,
  getPortfolioByUserIdSchema,
  getPortfolioByUsernameSchema,
  patchPortfolioSchema,
  postPortfolioSchema,
} from "../validators/schemas/portfolio";
import { postCheckUsernameAvailabilitySchema } from "../validators/schemas/portfolio/postCheckUsernameAvailability.schema";

const portfolioRoutes = Router();

portfolioRoutes.get(
  "/portfolios/:id",
  validate(getPortfolioByIdSchema),
  PortfolioController.handleGetPortfolioById
);

portfolioRoutes.get(
  "/portfolios/username/:username",
  validate(getPortfolioByUsernameSchema),
  PortfolioController.handleGetPortfolioByUsername
);

portfolioRoutes.get(
  "/portfolios/user/:user_id",
  validate(getPortfolioByUserIdSchema),
  PortfolioController.handleGetPortfolioByUserId
);

portfolioRoutes.post(
  "/portfolios",
  validate(postPortfolioSchema),
  PortfolioController.handlePostPortfolio
);

portfolioRoutes.post(
  "/portfolios/check-username-availability",
  validate(postCheckUsernameAvailabilitySchema),
  PortfolioController.handlePostCheckUsernameAvailability
);

portfolioRoutes.patch(
  "/portfolios/:id",
  validate(patchPortfolioSchema),
  PortfolioController.handlePatchPortfolio
);

export default portfolioRoutes;
