FROM node:14.7-buster AS build
COPY ./build ./app/build
COPY ./nginx.conf ./nginx.conf

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]