FROM node:12
WORKDIR /usr/src/cli
COPY package*.json ./
COPY ./bin ./bin
COPY ./src ./src
COPY entrypoint.sh /entrypoint.sh
RUN npm install
ENTRYPOINT ["./entrypoint.sh"]