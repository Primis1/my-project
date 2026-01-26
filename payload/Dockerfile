FROM node:18-alpine AS builder

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

RUN npm install --legacy-peer-deps

COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /home/node/app

# Install runtime dependencies for sharp
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    giflib \
    pixman

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production --legacy-peer-deps

# Copy built application from builder
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "run", "start"]
