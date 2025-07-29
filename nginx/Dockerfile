# Stage 1: Build the frontend React app
FROM node:18 AS frontend-builder
WORKDIR /app
COPY frontend ./
RUN npm install && npm run build

# Stage 2: Serve the built frontend with NGINX
FROM nginx:stable
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
