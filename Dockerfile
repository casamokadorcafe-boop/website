# syntax=docker/dockerfile:1.7

# -----------------------------------------------------------------------------
# Casa Mokador — production image.
# Multi-stage build:
#   1. deps  — installs dependencies in an immutable layer
#   2. build — builds the static site
#   3. run   — Caddy serves the static output on $PORT
# -----------------------------------------------------------------------------

# ----- 1. Dependencies --------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

# Install build toolchain only if sharp needs to compile (rare on alpine arm64)
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
# Use ci when a lockfile is present, install otherwise. Both work fresh.
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

# ----- 2. Build ---------------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ----- 3. Runtime — Caddy serves /dist on $PORT -------------------------------
FROM caddy:2-alpine AS run
WORKDIR /srv

COPY --from=build /app/dist /srv/dist
COPY Caddyfile /etc/caddy/Caddyfile

# Railway will inject PORT; default to 8080 when running locally.
ENV PORT=8080
EXPOSE 8080

# Caddy validates the file then runs.
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
