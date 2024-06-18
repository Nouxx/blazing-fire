FROM node:18.20.3

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

CMD pnpm install --frozen-lockfile