FROM node:10.15.0
WORKDIR /usr/src/app
RUN apt-get update
RUN apt-get install -y mongodb
VOLUME ["/data/db"]
WORKDIR /data
EXPOSE 27017
EXPOSE 28017
CMD ["mongod", "--smallfiles"]
