FROM node

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .
RUN yarn build
ENV NODE_ENV=production DB_USERNAME=postgres DB_PASSWORD=dev123456 AWS_RDS_POSTGRES_HOST=g-reddit.cm7aojv2di3a.ap-southeast-1.rds.amazonaws.com SESSION_DB_USERNAME=george SESSION_DB_PASSWORD=dev123 SESSION_SECRET_DEV_PROD=mysecret CORS_ORIGIN_PROD=http://georgedev.info

USER node

CMD ["yarn", "prod"] 