FROM node:24-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json tsconfig.json ./
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY lib/db/package.json ./lib/db/
COPY lib/api-zod/package.json ./lib/api-zod/
COPY lib/api-client-react/package.json ./lib/api-client-react/
COPY lib/api-spec/package.json ./lib/api-spec/
COPY scripts/package.json ./scripts/

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY artifacts/api-server ./artifacts/api-server
COPY lib ./lib

RUN pnpm --filter @workspace/api-server run build

WORKDIR /app/artifacts/api-server

EXPOSE 3000

CMD ["node", "dist/index.cjs"]
