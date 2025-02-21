FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./ 
RUN npm ci --include=dev --legacy-peer-deps


COPY . .
RUN ls && npm run build



FROM node:20-alpine AS runner


WORKDIR /app


COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./


EXPOSE 3000


CMD ["npm", "start"]

