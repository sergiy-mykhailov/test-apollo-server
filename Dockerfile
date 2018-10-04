FROM node:10.9.0 as build

WORKDIR /var/www/
COPY ./ /var/www/
RUN npm -q install
RUN npm -q run create
RUN npm -q run migrate
RUN npm -q run build
