FROM node:20-alpine as build

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

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/
COPY --from=build /app/.env.production /app/
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

EXPOSE 5000

CMD ["yarn", "start", "-p", "5000"]
