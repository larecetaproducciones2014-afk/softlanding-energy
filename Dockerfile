# Vista previa local del sitio compilado, servido con nginx (equivalente a producción).
# En producción se despliega con Cloudflare: `cd web && npm run build && cd .. && npx wrangler deploy`.
FROM node:22-alpine AS build
WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ ./
RUN npx astro build

FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
