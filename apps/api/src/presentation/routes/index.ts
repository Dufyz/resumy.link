import { Router } from "express";
import userRoutes from "./user.routes";
import portfolioRoutes from "./portfolio.routes";
import portfolioSectionRoutes from "./portfolio_section.routes";
import portfolioSectionItemsRoutes from "./portfolio_section_item.routes";

const routes = Router();
const apiRoutes = Router();

apiRoutes.get("/health-check", (_, res) => {
  res.json({ message: "Server is up and running!" }).status(200);
});

apiRoutes.use(userRoutes);
apiRoutes.use(portfolioRoutes);
apiRoutes.use(portfolioSectionRoutes);
apiRoutes.use(portfolioSectionItemsRoutes);

routes.use("/api", apiRoutes);

export default routes;
