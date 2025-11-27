FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine

COPY --from=build /usr/src/app/dist/angular-15-crud /usr/share/nginx/html

# Default Nginx config will be overridden by a custom one mounted or baked in
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


