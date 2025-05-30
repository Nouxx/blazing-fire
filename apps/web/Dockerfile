ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-slim AS base

FROM base AS partial-monorepo

WORKDIR /app

RUN npm install -g turbo@2.0.7

COPY . .

RUN turbo prune web --docker

FROM base AS builder

WORKDIR /app

COPY --from=partial-monorepo /app/out/json/ .
COPY --from=partial-monorepo /app/out/package-lock.json ./package-lock.json

RUN npm clean-install

COPY --from=partial-monorepo /app/out/full/ .

# environment variables required for the build
ENV PUBLIC_VERSION=local

RUN npx turbo run build --filter=web

FROM base AS prod-dep

WORKDIR /app

COPY --from=partial-monorepo /app/out/json/ .
COPY --from=partial-monorepo /app/out/package-lock.json ./package-lock.json

RUN npm clean-install --omit=dev

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/apps/web/build apps/web/build/
COPY --from=prod-dep /app/node_modules ./node_modules/
COPY --from=builder /app/apps/web/package.json apps/web/package.json

ENV NODE_ENV=production

WORKDIR /app/apps/web

EXPOSE 3000

CMD node build
