ARG NODE_VERSION=18

FROM node:${NODE_VERSION} AS builder

EXPOSE 3000

WORKDIR /app

# todo: try without the root: it's not possible BUT
# use turbo prune to generate a subset of the mono repo for the app
# https://turbo.build/repo/docs/reference/prune
# also read: https://turbo.build/repo/docs/guides/tools/docker
COPY package.json .
COPY package-lock.json .
COPY turbo.json .
COPY .npmrc .
COPY apps/web/package.json /app/apps/web/package.json

RUN npm clean-install

WORKDIR /app/apps/web

COPY apps/web/src src
COPY apps/web/static static
COPY apps/web/postcss.config.js .
COPY apps/web/svelte.config.js .
COPY apps/web/tailwind.config.js .
COPY apps/web/tsconfig.json .
COPY apps/web/vite.config.ts .

RUN npm run build
# RUN npm prune --omit=dev # npm error Cannot set properties of null (setting 'dev') 
# > this should not be necessary?

FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=builder /app/apps/web/build apps/web/build/
COPY --from=builder /app/node_modules /app/node_modules/
COPY apps/web/package.json /app/apps/web/package.json

ENV NODE_ENV=production

WORKDIR /app/apps/web

CMD node build

# todo: format does not work