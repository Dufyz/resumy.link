import express, { Router } from "express";
import * as StripeController from "../controllers/stripe.controller";

export const stripeWebhookRouter = Router();

stripeWebhookRouter.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  StripeController.handleWebhook
);

export default stripeWebhookRouter;
