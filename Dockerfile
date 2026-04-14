FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./frontend/
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

FROM node:20-alpine AS backend-builder
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm install

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY backend ./backend
COPY --from=frontend-builder /app/frontend/build ./frontend/build
WORKDIR /app/backend
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
