FROM node:14.7.0-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VUE_API_URL

ENV API_URL $VUE_API_URL

RUN echo $API_URL

RUN echo $VUE_API_URL

RUN npm run build

FROM nginx:alpine

WORKDIR /var/www

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
