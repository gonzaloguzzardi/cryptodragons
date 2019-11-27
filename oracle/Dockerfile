FROM node:10.15.0

WORKDIR /usr/src/app
COPY ./ ./
WORKDIR /usr/src/app/oracle
RUN rm -r node_modules
RUN npm install
CMD [ "npm", "start" ]