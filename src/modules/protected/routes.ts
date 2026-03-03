import Elysia from "elysia";
import { authMiddleware } from "../../middleware/auth";

export const protectedRoutes = new Elysia({
  name: "protected",
  prefix: "/protected",
  tags: ["Protected"],
})
  .use(authMiddleware)
  .get("/", ({ user }) => {
    return user;
  });
