FROM node:slim

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .
RUN yarn build
ENV NODE_ENV=dev

CMD ["yarn", "prod"] 