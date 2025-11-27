# Stage 1: Build Angular application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html

# Copy nginx configuration (will be provided via docker-compose volume mount)
# For standalone build, we'll use default nginx config
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
