# Elysia Template

A production-ready [ElysiaJS](https://elysiajs.com) backend template with Bun, TypeScript, Docker, and dynamic module loading.

## Prerequisites

- [Bun](https://bun.sh) v1.0+
- [Docker](https://docs.docker.com/get-docker/) (optional)

## Quick Start

```bash
# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Edit .env (required variables: NODE_ENV, PORT)
# NODE_ENV=development
# PORT=3131

# Run development server (with watch)
bun run dev

# Or run without watch
bun run start
```

The API will be available at `http://localhost:3131` (or your configured `PORT`).

## Prisma

### Setup (New Project)

If starting fresh, initialize Prisma with a database:

```bash
bunx --bun prisma init --db --output ./src/infra/prisma
```

This creates the schema at `src/infra/prisma/schema/` and migrations at `src/infra/prisma/migrations/`.

**Required:** Add `DATABASE_URL` to your `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/your_database"
```

### Commands

```bash
# Generate Prisma Client
bunx prisma generate

# Create and apply migrations
bunx --bun prisma migrate dev --name <migration_name>

# Pull schema from existing database
bunx prisma db pull
```

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `bun run dev`          | Start dev server with hot reload         |
| `bun run start`        | Run the app (no compilation)             |
| `bun run build`        | Compile to a standalone binary (Windows) |
| `bun run build:docker` | Compile for Linux x64 (for Docker)       |
| `bun run start:prod`   | Run the compiled binary (Linux only)     |

## Project Structure

```
src/
├── index.ts           # Entry point
├── config/            # Configuration & env validation
├── server/            # HTTP server setup
├── modules/           # Feature modules (auto-loaded)
│   ├── index.ts       # Module loader (discovers */routes.ts)
│   └── health/
│       └── routes.ts  # Example: /health endpoint
├── middleware/        # Global middleware
├── common/            # Shared utilities (logger, etc.)
├── models/            # Schemas, errors, types
└── infra/             # Infrastructure
    └── prisma/        # Schema, migrations, generated client
        ├── schema/
        ├── migrations/
        └── client/
```

## Adding a New Module

1. Create a folder under `src/modules/` (e.g. `src/modules/users/`).
2. Add a `routes.ts` file that exports an Elysia instance:

```typescript
// src/modules/users/routes.ts
import Elysia from "elysia";

export default new Elysia({ prefix: "/users" })
  .get("/", () => ({ users: [] }))
  .get("/:id", ({ params: { id } }) => ({ id }));
```

3. Restart the server — the module is discovered and mounted automatically.

## Environment Variables

| Variable                      | Required | Default       | Description                                      |
| ----------------------------- | -------- | ------------- | ------------------------------------------------ |
| `NODE_ENV`                    | No       | `development` | `development` \| `test` \| `production`          |
| `PORT`                        | No       | `3131`        | Server port                                      |
| `DATABASE_URL`                | Yes*     | —             | PostgreSQL connection string (required for Prisma)|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | No       | —             | OpenTelemetry endpoint (optional)                 |

\* Required when using Prisma; add to `.env` before running migrations or `db pull`.

Add new variables in `src/config/env.ts` (schema + validation).

## Docker

### Build & Run

```bash
# Build image
docker compose build

# Run (requires .env with PORT)
docker compose up -d

# View logs
docker compose logs -f app
```

### Dockerfile

- Uses `oven/bun` as base.
- Compiles with `bun run build:docker` (Linux x64).
- Runs the compiled binary for better performance.

## API Endpoints

| Method | Path      | Description             |
| ------ | --------- | ----------------------- |
| GET    | `/health` | Health check            |
| GET    | `/help`   | Swagger UI (if enabled) |

## License

MIT
