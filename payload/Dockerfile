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

# Install runtime dependencies for sharp
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    giflib \
    pixman

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone output
COPY --from=builder /home/node/app/.next/standalone ./
COPY --from=builder /home/node/app/.next/static ./.next/static
COPY --from=builder /home/node/app/public ./public

EXPOSE 3000

# Run the server
CMD ["node", "server.js"]
