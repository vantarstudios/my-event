FROM node:20-alpine

WORKDIR /app

COPY package.json /app/

RUN --mount=type=secret,id=NODE_ENV \
    --mount=type=secret,id=NEXT_PUBLIC_API_URL \
    echo "NODE_ENV=$(cat /run/secrets/NODE_ENV)" >> .env.production \
    && echo "NEXT_PUBLIC_API_URL=$(cat /run/secrets/NEXT_PUBLIC_API_URL)" >> .env.production \
    && cat .env.production

RUN npm install -g @nestjs/cli

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start", "-p", "5000"]
