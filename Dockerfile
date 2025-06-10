###############################################################################
# Stage 1 – Build React client with Vite
###############################################################################
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps needed for the build only
COPY package*.json ./
RUN npm ci            # prod + dev deps

# Copy source and build client
COPY . .
RUN npm run build:client   # outputs to /app/dist

###############################################################################
# Stage 2 – Production server (Express + Prisma)
###############################################################################
# ----- Stage 2 -----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev && npx prisma generate

COPY server ./server
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node", "server/index.js"]
