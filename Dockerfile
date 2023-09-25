FROM node:alpine AS builder

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/build ./build
COPY --from=builder /usr/app/prisma ./prisma


EXPOSE 3001

CMD [ "npm", "run", "start:migrate:prod" ]