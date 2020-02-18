FROM node:8

## install typescript
RUN npm install -g typescript

WORKDIR /usr/src/server
COPY . .
RUN npm install
RUN npm run build

EXPOSE 4000
ENTRYPOINT ["dumb-init", "--"]
CMD [ "node", "./dist" ]