ARG NODE_VERSION=18

FROM node:${NODE_VERSION} AS base

WORKDIR /app

EXPOSE 3000

FROM base AS builder

# todo: --prod for install
RUN --mount=type=bind,source=package.json,target=package.json \
	--mount=type=bind,source=package-lock.json,target=package-lock.json \
	--mount=type=bind,source=turbo.json,target=turbo.json \
	--mount=type=bind,source=.npmrc,target=.npmrc \
	--mount=type=bind,source=apps/web/package.json,target=apps/web/package.json \
	npm clean-install

WORKDIR /app/apps/web

FROM builder AS prod

# todo: optimize
COPY apps/web .

RUN npm run build

CMD node build
