FROM nginx:1.17.1-alpine
COPY /dist/russian /usr/share/nginx/html
