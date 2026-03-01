import Elysia from "elysia";
import { responseSchema } from "../models/schemas/response";

export const responseMiddleware = new Elysia({ name: "response" })
  .mapResponse(({ responseValue, request, set, headers }) => {
    const contentType = headers["Content-Type"];
    if (
      contentType &&
      typeof contentType === "string" &&
      !contentType.includes("application/json")
    ) {
      return;
    }

    const path = new URL(request.url).pathname;
    const statusCode = typeof set.status === "number" ? set.status : 200;

    if (
      responseValue &&
      typeof responseValue === "object" &&
      "success" in responseValue
    ) {
      return new Response(JSON.stringify(createResponse(responseValue, path)), {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(createResponse(responseValue, path)), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  })
  .as("scoped");

export const createResponse = <T>(
  data: T,
  path: string,
): typeof responseSchema.static => ({
  success: true,
  data,
  timestamp: new Date().toISOString(),
  path,
});
