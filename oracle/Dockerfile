FROM node:10.15.0

WORKDIR /usr/src/app
COPY . .
RUN if test -d node_modules; then rm -r node_modules; fi
RUN npm install
EXPOSE 8001
EXPOSE 8002
EXPOSE 8081
CMD ["node", "oracle.js"]