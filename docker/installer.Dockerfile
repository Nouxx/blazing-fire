ARG NODE_VERSION=18

FROM node:${NODE_VERSION} AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN pnpm config set store-dir /pnpm/.pnpm-store

WORKDIR /app
