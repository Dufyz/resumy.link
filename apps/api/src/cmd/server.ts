import helmet from "helmet";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { NODE_ENV, SERVER_PORT, WEB_URL } from "../infra/config";
import routes from "../presentation/routes";
import webhookRoutes from "../presentation/webhooks";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

// TODO: Configurar logger melhor (atualmente usando morgan)

const app = express();

app.use(
  cors({
    origin: WEB_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Muitas requisições. Tente novamente mais tarde.",
  })
);

app.use(morgan("dev"));

app.use(webhookRoutes);
app.use(express.json());
app.use(routes);

async function startServer() {
  try {
    const server = app.listen(SERVER_PORT, () => {
      console.log(
        `Server running in ${NODE_ENV} mode on http://localhost:${SERVER_PORT}`
      );
    });

    server.timeout = 30000;

    // // Graceful Shutdown
    // process.on("SIGINT", async () => {
    //   console.log("Encerrando o servidor...");
    //   await db.destroy();
    //   server.close(() => {
    //     console.log("Servidor encerrado com sucesso.");
    //     process.exit(0);
    //   });
    // });
  } catch (error) {
    console.error("Erro ao rodar migrations:", error);
    process.exit(1);
  }
}

startServer();
