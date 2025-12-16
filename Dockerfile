FROM node:24-alpine

WORKDIR /app
RUN apk add --no-cache redis


COPY package.json ./
RUN npm install
COPY . .

EXPOSE 8000
CMD sh -c "redis-server & npm run dev"
