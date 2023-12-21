FROM node:20-alpine

ARG NODE_ENV
ARG NEXT_PUBLIC_API_URL

WORKDIR /app

COPY package.json /app/

RUN echo "NODE_ENV=production" >> .env.production
RUN echo "NEXT_PUBLIC_API_URL=https://api-staging.eventmediapp.com" >> .env.production
RUN cat .env.production

RUN npm install -g @nestjs/cli

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start", "-p", "5000"]
