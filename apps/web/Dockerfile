ARG NODE_VERSION=18

FROM node:${NODE_VERSION} AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS dev

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=bind,source=pnpm-workspace.yaml,target=pnpm-workspace.yaml \
    --mount=type=bind,source=turbo.json,target=turbo.json \
    --mount=type=bind,source=.npmrc,target=.npmrc \
    --mount=type=bind,source=apps/web/package.json,target=apps/web/package.json \
    --mount=type=bind,source=apps/web/.npmrc,target=apps/web/.npmrc \
    pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/web

EXPOSE 5173

CMD pnpm dev --host