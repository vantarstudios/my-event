FROM node:20-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install -g @nestjs/cli

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start", "-p", "5000"]
