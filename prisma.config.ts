import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/infra/prisma/schema",
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/postgres",
  },
  migrations: {
    path: "src/infra/prisma/migrations",
    seed: "src/infra/prisma/seed/index.ts",
  },
});
