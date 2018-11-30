FROM docker.io/node:8.14.0-alpine

RUN mkdir /home/app/
WORKDIR /home/app/
ADD . /home/app/

RUN cd /home/app/ && npm install

EXPOSE 4000 3000
