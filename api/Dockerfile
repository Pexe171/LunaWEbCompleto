# Dockerfile para a API
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && apk add --no-cache curl

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
