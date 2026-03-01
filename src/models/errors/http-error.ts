import { status } from "elysia";

export const NotAuthorizedError = (message?: string) => {
  return status(401, message);
};
