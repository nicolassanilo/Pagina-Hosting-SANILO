FROM node:20-alpine AS builder
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json* ./

# Copy backend
COPY backend ./backend

# Copy frontend  
COPY frontend ./frontend

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies and build
RUN cd frontend && npm install && npm run build

FROM node:20-alpine AS production
WORKDIR /app

# Copy backend from builder
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/build ./frontend/build

WORKDIR /app/backend

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
