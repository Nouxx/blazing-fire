ARG NODE_VERSION=18

FROM node:${NODE_VERSION}

# https://consoledonottrack.com
ENV DO_NOT_TRACK=1

WORKDIR /app
