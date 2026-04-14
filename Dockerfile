FROM node:20-alpine AS builder
WORKDIR /app

# Copy backend first
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci

# Copy frontend and build
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm ci && npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built frontend
COPY --from=builder /app/frontend/build ./frontend/build

# Copy backend with installed dependencies
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY backend ./backend

WORKDIR /app/backend

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
