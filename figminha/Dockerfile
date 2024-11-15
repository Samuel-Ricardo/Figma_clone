FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./ 
RUN npm ci --include=dev


COPY . .
RUN npm run build



FROM node:20-alpine AS runner


WORKDIR /app


COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./


EXPOSE 3000


CMD ["npm", "start"]

