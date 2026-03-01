import { HttpServer } from "./server/index";
import { logger } from "./common/logger";

const server = new HttpServer();

void server.start();

const shutdown = (signal: string) => {
  return async () => {
    logger.warn(`Received ${signal}, shutting down`);
    await server.stop();
    process.exit(0);
  };
};

process.on("SIGINT", () => void shutdown("SIGINT")());
process.on("SIGTERM", () => void shutdown("SIGTERM")());
