FROM node:14-alpine AS builder

RUN mkdir -p /graphql-book/client

WORKDIR /graphql-book/client

# FROM base as development

# CMD ["npm", "run", "start"]

# FROM base as production

COPY package.json package-lock.json /graphql-book/client/

RUN npm ci

COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /graphql-book/client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]