import { Router } from "express";

const routes = Router();
const apiRoutes = Router();

apiRoutes.get("/health-check", (_, res) => {
  res.json({ message: "Server is up and running!" }).status(200);
});

// apiRoutes.use();

routes.use("/api", apiRoutes);

export default routes;
