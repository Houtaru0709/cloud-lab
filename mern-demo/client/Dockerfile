# Stage 1: Build React Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Cai dat dependencies
COPY package*.json ./
RUN npm ci

# Sao chep source code
COPY . .

# Cau hinh Backend URL truoc khi build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build React
RUN npm run build

# Stage 2: Chay Frontend
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]