import { Router } from "express";
import userRoutes from "./user.routes";
import portfolioRoutes from "./portfolio.routes";
import sectionRoutes from "./section.routes";

const routes = Router();
const apiRoutes = Router();

apiRoutes.get("/health-check", (_, res) => {
  res.json({ message: "Server is up and running!" }).status(200);
});

apiRoutes.use(userRoutes);
apiRoutes.use(portfolioRoutes);
apiRoutes.use(sectionRoutes);

routes.use("/api", apiRoutes);

export default routes;
