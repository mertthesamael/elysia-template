import { status } from "elysia";

export const NotAuthorizedError = (message?: string) => {
  return status(401, message);
};

export const InvalidBodyError = (message?: string) => {
  return status(400, message);
};
