FROM node

# add code
COPY ./web /app

WORKDIR /app
RUN yarn install --pure-lockfile && yarn cache clean --production
RUN yarn build
RUN yarn export