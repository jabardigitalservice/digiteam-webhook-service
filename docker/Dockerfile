FROM --platform=linux/amd64 registry.digitalservice.id/proxyjds/library/node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM --platform=linux/amd64 registry.digitalservice.id/proxyjds/library/node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD node dist/main.js