# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── mockup-sandbox/     # React + Vite mockup sandbox
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # pnpm workspace config
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Key Commands

- `pnpm --filter @workspace/api-server run dev` — run the API dev server
- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client/zod from OpenAPI spec
- `pnpm run typecheck` — typecheck all packages
- `pnpm run build` — build all packages

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes in `src/routes/`, validated with `@workspace/api-zod`, persisted via `@workspace/db`.

- Entry: `src/index.ts` — reads `PORT`, starts Express on port 3000
- App: `src/app.ts` — mounts middleware and routes at `/api`
- Routes: `src/routes/health.ts` — `GET /api/health`

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM + PostgreSQL.

- `src/index.ts` — exports `db`, `pool`, `schema`
- `src/schema/index.ts` — barrel re-export of all models
- `drizzle.config.ts` — requires `DATABASE_URL`

### `lib/api-zod` (`@workspace/api-zod`)

Zod schemas generated from OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

React Query hooks generated from OpenAPI spec.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec (`openapi.yaml`) and Orval codegen config.

### `scripts` (`@workspace/scripts`)

Utility scripts. Each `.ts` file in `src/` has a corresponding npm script.
