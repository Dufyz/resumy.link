import { Router } from "express";

import * as OnboardingController from "../controllers/onboarding.controller";
import { validate } from "../middlewares/zod.middleware";

import { postOnboardingSchema } from "../validators/schemas/onboarding/postOnboarding.schema";

const onboardingRoutes = Router();

onboardingRoutes.post(
  "/onboarding",
  validate(postOnboardingSchema),
  OnboardingController.handlePostOnboarding
);

export default onboardingRoutes;
