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

# 1. Copy package files from builder (not host) so lock file matches what was actually installed
COPY --from=builder /home/node/app/package.json ./
COPY --from=builder /home/node/app/package-lock.json ./

# 2. Install production dependencies
RUN npm ci --omit=dev --legacy-peer-deps

# 3. Copy standalone output and static assets
COPY --from=builder /home/node/app/.next/standalone ./
COPY --from=builder /home/node/app/.next/static ./.next/static
COPY --from=builder /home/node/app/public ./public

# 4. Copy source code (for migrations and Payload config)
COPY --from=builder /home/node/app/src ./src

EXPOSE 3000
CMD ["node", "server.js"]