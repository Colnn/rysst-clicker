# Build Stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
 
# Production Stage
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./
RUN npm install -g serve
EXPOSE 8000
CMD ["serve", "-p", "8000", "/app"]
