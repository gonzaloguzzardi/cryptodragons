FROM node:10.15.0

WORKDIR /usr/src/app
COPY ./ ./
WORKDIR /usr/src/app/oracle
RUN if test -d node_modules; then rm -r node_modules; fi
RUN npm install
#EXPOSE 46658 loom
#EXPOSE 27017 mongo
#EXPOSE 8545 bfa
EXPOSE 8081
EXPOSE 8001
EXPOSE 8002
CMD [ "npm", "init" ]
