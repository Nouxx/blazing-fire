ARG NODE_VERSION=18

FROM node:${NODE_VERSION}

# https://consoledonottrack.com
ENV DO_NOT_TRACK=1

WORKDIR /app

COPY ../package.json .
COPY ../package-lock.json .
COPY ../turbo.json .
COPY ../.npmrc .

WORKDIR /app/apps/web

COPY ../apps/web/package.json .

WORKDIR /app

RUN npm clean-install