FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app

RUN yarn start -p 5000

EXPOSE 5000

CMD ["yarn", "start"]
