FROM node:10.15.0

WORKDIR /usr/src/app
COPY ./ ./
WORKDIR /usr/src/app/oracle
RUN if test -d node_modules; then rm -r node_modules; fi
RUN npm install
EXPOSE 46658
EXPOSE 27017
EXPOSE 8545
EXPOSE 8081
CMD [ "npm", "start" ]
