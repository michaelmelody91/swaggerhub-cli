FROM node:12
WORKDIR /usr/src/cli

COPY package*.json ./
COPY ./bin ./bin
COPY ./src ./src

RUN npm install
RUN cat /usr/src/cli/bin/run

ENTRYPOINT ["./bin/run"]