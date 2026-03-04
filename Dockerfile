# ===============================
# Build stage (Vite build)
# ===============================
FROM node:18.19.0-alpine AS builder

WORKDIR /app

# ---- Build arguments ----
ARG VITE_APP_BASE_URL
ARG VITE_APP_COOKIE_DOMAIN
ARG VITE_APP_USER_PORTAL_HOST
ARG VITE_APP_LOGIN_REDIRECT_URL
ARG VITE_APP_MARKETPLACE_HOST
ARG VITE_APP_LOGIN_URL
ARG VITE_APP_PLAN_COOKIE_KEY_NAME
ARG VITE_APP_USER_COOKIE_KEY_NAME
ARG VITE_APP_CHAT_BASE_URL
ARG VITE_APP_STRAPI_BASE_URL
ARG VITE_APP_TRANSEDITOR_PORT
ARG VITEATE_SOURCEMAP
ARG VITE_APP_AI_GEN_URL
ARG VITE_APP_AI_CANVAS_STAGING_API
ARG VITE_APP_DESIGNER_HOST
ARG VITE_APP_SENTRY_DSN



# ---- Export envs for Vite ----
ENV VITE_APP_BASE_URL=${VITE_APP_BASE_URL} \
    VITE_APP_COOKIE_DOMAIN=${VITE_APP_COOKIE_DOMAIN} \
    VITE_APP_USER_PORTAL_HOST=${VITE_APP_USER_PORTAL_HOST} \
    VITE_APP_LOGIN_REDIRECT_URL=${VITE_APP_LOGIN_REDIRECT_URL} \
    VITE_APP_MARKETPLACE_HOST=${VITE_APP_MARKETPLACE_HOST} \
    VITE_APP_LOGIN_URL=${VITE_APP_LOGIN_URL} \
    VITE_APP_PLAN_COOKIE_KEY_NAME=${VITE_APP_PLAN_COOKIE_KEY_NAME} \
    VITE_APP_USER_COOKIE_KEY_NAME=${VITE_APP_USER_COOKIE_KEY_NAME} \
    VITE_APP_CHAT_BASE_URL=${VITE_APP_CHAT_BASE_URL} \
    VITE_APP_STRAPI_BASE_URL=${VITE_APP_STRAPI_BASE_URL} \
    VITE_APP_TRANSEDITOR_PORT=${VITE_APP_TRANSEDITOR_PORT} \
    VITE_SOURCEMAP=${VITE_SOURCEMAP} \
    VITE_APP_AI_GEN_URL=${VITE_APP_AI_GEN_URL} \
    VITE_APP_AI_CANVAS_STAGING_API=${VITE_APP_AI_CANVAS_STAGING_API} \
    VITE_APP_DESIGNER_HOST=${VITE_APP_DESIGNER_HOST} \
    VITE_APP_SENTRY_DSN=${VITE_APP_SENTRY_DSN}
# ---- Install dependencies ----
COPY package.json package-lock.json* ./
RUN npm install

# ---- Copy source ----
COPY . .

# ---- Build Vite app ----
RUN npm run build


# ===============================
# Production stage (NGINX)
# ===============================
FROM nginx:1.25-alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
