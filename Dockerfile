FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

COPY entrypoint.sh .


RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT [ "./entrypoint.sh" ]