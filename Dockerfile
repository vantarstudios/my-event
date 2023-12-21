FROM node:20-alpine

WORKDIR /app

COPY package.json /app/

ARG NODE_ENV
ARG API_URL

RUN echo "NODE_ENV=$NODE_ENV" >> .env.production
RUN echo "API_URL=$API_URL" >> .env.production
RUN cat .env.production

RUN npm install -g @nestjs/cli

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start", "-p", "5000"]
