# syntax=docker/dockerfile:1

FROM node:18.3.0-alpine AS builder
WORKDIR /src

COPY ./package.json ./
RUN npm i --global-style=true --no-safe  --force piscina && \
    npm install --force
COPY ./ ./
RUN npm run webpack-build && \
    mkdir ./dist/node_modules && \
    cp -r ./node_modules/piscina ./dist/node_modules/

FROM node:18.3.0-alpine
EXPOSE 5000
WORKDIR /app
COPY --chown=1000:1000 --from=builder /src/dist/ ./
USER 1000
CMD ["node", "./index.bundle.mjs"]  
