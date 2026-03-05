FROM node:20-alpine AS builder

WORKDIR /home/node/app

# Install dependencies needed for sharp and other native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    pixman-dev

COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install sharp for ARM64
RUN npm install --platform=linuxmusl --arch=arm64 sharp --legacy-peer-deps

# Copy .env file (only needs PAYLOAD_SECRET for build)
COPY .env* ./

COPY . .

# Remove lockfile to avoid Next.js patching issues on ARM64
RUN rm -f package-lock.json

# Build using experimental compile mode (no DB needed)
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /home/node/app

RUN apk add --no-cache cairo jpeg pango giflib pixman

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 1. Copy package files first (for better layer caching)
COPY --from=builder /home/node/app/package*.json ./

# 2. Install production dependencies (this creates node_modules with the payload CLI)
RUN npm install --omit=dev --legacy-peer-deps

# 3. Copy standalone output and static assets
COPY --from=builder /home/node/app/.next/standalone ./
COPY --from=builder /home/node/app/.next/static ./.next/static
COPY --from=builder /home/node/app/public ./public

# 4. Copy source code (for migrations and Payload config)
COPY --from=builder /home/node/app/src ./src

EXPOSE 3000
CMD ["node", "server.js"]