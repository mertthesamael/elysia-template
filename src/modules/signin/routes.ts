import Elysia from "elysia";
import {
  signInSchema,
  signInResponseSchema,
} from "../../models/schemas/signin";
import { SignInService } from "./service";

export default new Elysia({
  name: "signin",
  prefix: "/signin",
  tags: ["Authentication"],
}).post(
  "/",
  async ({ body }) => {
    return await SignInService.signIn(body);
  },
  {
    body: signInSchema,
    response: signInResponseSchema,
  },
);
