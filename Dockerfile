# ---------- Stage 1 – Build React client ----------
FROM node:20-alpine AS builder
WORKDIR /app

# only copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm ci           # prod + dev deps for build step

# copy the rest of the source and build
COPY . .
RUN npm run build:client   # creates /app/dist

# ---------- Stage 2 – Production server ----------
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

# install only runtime deps
COPY package*.json ./
RUN npm ci --omit=dev

# copy server code and built client bundle
COPY server ./server
COPY --from=builder /app/dist ./dist

EXPOSE 4000
CMD ["node", "server/index.js"]
