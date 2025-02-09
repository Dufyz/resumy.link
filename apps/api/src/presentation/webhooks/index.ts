import { Router } from "express";
import stripeWebhookRouter from "./stripe.webhooks";

const webhookRoutes = Router();

webhookRoutes.use("/webhook", stripeWebhookRouter);

export default webhookRoutes;
