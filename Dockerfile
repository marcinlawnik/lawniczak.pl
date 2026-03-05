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

# Traefik: redirect lawniczak.me → lawniczak.pl
LABEL traefik.http.middlewares.redirect-me-to-pl.redirectregex.regex="^(https?://)?lawniczak\\.me(.*)"
LABEL traefik.http.middlewares.redirect-me-to-pl.redirectregex.replacement="https://lawniczak.pl$${2}"
LABEL traefik.http.middlewares.redirect-me-to-pl.redirectregex.permanent="true"
LABEL traefik.http.routers.redirect-me-to-pl.middlewares="redirect-to-https,redirect-me-to-pl"
LABEL traefik.http.routers.redirect-me-to-pl.rule="Host(\`lawniczak.me\`) && PathPrefix(\`/\`)"
LABEL traefik.http.routers.redirect-me-to-pl.entryPoints="https"
LABEL traefik.http.routers.redirect-me-to-pl.tls.certresolver="letsencrypt"
LABEL traefik.http.routers.redirect-me-to-pl.tls="true"

EXPOSE 80
