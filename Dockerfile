###############################################################################
# Stage 1 – Build React client with Vite
###############################################################################
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps needed for the client build
COPY package*.json ./
RUN npm ci            # installs both prod + dev deps

# Copy all source and build client
COPY . .
RUN npm run build:client   # outputs to /app/dist

###############################################################################
# Stage 2 – Production server (Express + Prisma)
###############################################################################
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

# Needed for TLS, etc.
RUN apk add --no-cache openssl

# 1. Install prod deps & generate Prisma client
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev \
    && npx prisma generate

# 2. Copy server code and built client assets
COPY server ./server
COPY --from=builder /app/dist ./dist

EXPOSE 4000

# 3. On startup: run migrations, then launch the server
CMD ["sh", "-c", "npx prisma migrate deploy && node server/index.js"]
