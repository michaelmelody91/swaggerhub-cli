FROM node:12
WORKDIR /usr/src/cli
COPY package*.json ./
COPY ./bin ./bin
COPY ./src ./src
COPY ./.github/action/entrypoint.sh ./gh_entrypoint.sh
RUN npm install
ENTRYPOINT ["/usr/src/cli/bin/run"]
