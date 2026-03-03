import Elysia from "elysia";
import { echoResponseSchema, echoSchema } from "../../models/schemas/health";
import { HealtService } from "./service";

export default new Elysia({
  name: "health",
  prefix: "/health",
  tags: ["Health Check"],
})
  .get("/", () => "ok")
  .post(
    "/echo",
    ({ body }) => {
      return HealtService.echo(body.message);
    },
    {
      body: echoSchema,
      response: echoResponseSchema,
    },
  );
