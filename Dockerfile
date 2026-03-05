# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Coolify injects SOURCE_COMMIT automatically
ARG SOURCE_COMMIT=unknown
ENV GIT_COMMIT=$SOURCE_COMMIT
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
