FROM node:14-alpine AS base

RUN mkdir -p /graphql-book/server

WORKDIR /graphql-book/server

EXPOSE 9090

FROM base as development

CMD ["npm", "run", "start"]

FROM base as production

COPY package.json package-lock.json /graphql-book/server/

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]