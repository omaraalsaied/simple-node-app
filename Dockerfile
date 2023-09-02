FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=123456

WORKDIR  /home/node/node-farm

COPY . .

RUN npm install

RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "start"]