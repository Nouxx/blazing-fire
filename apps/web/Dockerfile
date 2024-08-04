ARG NODE_VERSION=18

FROM node:${NODE_VERSION} AS base

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

RUN npx turbo run build --filter=web

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/apps/web/build apps/web/build/
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/apps/web/package.json apps/web/package.json

ENV NODE_ENV=production

WORKDIR /app/apps/web

EXPOSE 3000

CMD node build

# todo: format does not work
