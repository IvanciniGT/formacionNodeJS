FROM node:18.18

ENV DB_NAME=animalitos
ENV DB_USER=usuario
ENV DB_PASS=password
ENV DB_HOST=basededatos

EXPOSE 8080

RUN mkdir -p /app/bin
RUN mkdir /app/node_modules
COPY bin /app/bin
COPY node_modules /app/node_modules

WORKDIR /app
CMD ["node", "./bin/app/app.js"]

#docker build .. -t mi-imagen:latest -f ./Dockerfile