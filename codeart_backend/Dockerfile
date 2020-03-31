# FROM node:10-alpine

FROM node:8.16.2-buster-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

# USER node

USER root


# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done


RUN apt-get update --fix-missing \
    && apt-get -y install \
    python -y \
    make \
    g++ \
    && npm install 

#//// ALPINE INSTRUCTIONS ////
# RUN apk --no-cache --virtual build-dependencies add \
#     build-base \
#     python \
#     make \
#     g++ \
#     && npm install \
#     && apk del build-dependencies

COPY --chown=node:node . .

EXPOSE 8090

CMD [ "node", "app.js" ]
