FROM node:14.7.0-alpine

WORKDIR /app

ENV NODE_ENV local

ENV MONGODB_URL mongodb://localhost:27017

ENV MONGODB_DB admin_ambulu

ENV JWT_SECRET secret

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["/bin/node", "./bin/www"]

EXPOSE 3000
