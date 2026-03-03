import Elysia from "elysia";
import bearer from "@elysiajs/bearer";
import { AuthService } from "../infra/auth/service";

export const authMiddleware = new Elysia({ name: "auth" })
  .use(bearer())
  .derive(async ({ bearer }) => {
    const user = await AuthService.validateToken(bearer);
    return { user };
  })
  .as("scoped");
