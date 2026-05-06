FROM oven/bun:1.1.45-alpine AS base
# RUN apk add --no-cache git wget

WORKDIR /

COPY package.json bun.lock ./
RUN bun install

COPY . .

USER bun
ENTRYPOINT [ "bun", "run", "src/index.ts" ]