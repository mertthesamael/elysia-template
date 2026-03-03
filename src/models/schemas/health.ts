import { t } from "elysia";

export const echoSchema = t.Object({
  message: t.String(),
});

export const echoResponseSchema = t.Object({
  message: t.String(),
});
