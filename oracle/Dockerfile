FROM node:10.15.0

WORKDIR /usr/src/app
COPY package.json .
COPY . .
RUN npm install
CMD [ "npm", "start" ]