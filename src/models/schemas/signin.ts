import { t } from "elysia";

export const signInSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 1 }),
});

export const signInResponseSchema = t.Object({
  token: t.String(),
  expiresIn: t.String(),
});
