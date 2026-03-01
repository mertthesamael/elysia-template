import Elysia from "elysia";

export default new Elysia({
  name: "health",
  prefix: "/health",
  tags: ["Health Check"],
}).get("/", () => "ok");
