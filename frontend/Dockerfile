FROM node:13.12.0-alpine as build

WORKDIR /client
COPY package.json /client/package.json

RUN npm install --only=prod

COPY . /client
RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /client/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]