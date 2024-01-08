FROM node:20-alpine as build

WORKDIR /app

COPY package.json /app/

RUN --mount=type=secret,id=NODE_ENV \
    --mount=type=secret,id=NEXT_PUBLIC_API_URL \
    echo "NODE_ENV=$(cat /run/secrets/NODE_ENV)" >> .env.production \
    && echo "NEXT_PUBLIC_API_URL=$(cat /run/secrets/NEXT_PUBLIC_API_URL)" >> .env.production \
    && cat .env.production

RUN yarn install

COPY . /app

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env.production ./.env.production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./next.config.js

EXPOSE 5000

CMD ["yarn", "start", "-p", "5000"]
