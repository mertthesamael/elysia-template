import { Elysia } from "elysia";
import { config } from "../config/index";
import { logger } from "../common/logger";
import { registerModules } from "../modules";

export class HttpServer {
  private app: any;
  private server?: ReturnType<Elysia["listen"]>;

  constructor() {
    this.app = new Elysia().use(registerModules);
  }

  async start() {
    if (this.server) return;

    await this.app.modules;

    this.server = this.app.listen(config.env.server.port, () => {
      logger.info(
        `API ready on port ${config.env.server.port}. Version: ${config.version}`,
      );
    });
  }

  async stop() {
    if (!this.server) return;
    this.server.stop();
    this.server = undefined;
  }
}
