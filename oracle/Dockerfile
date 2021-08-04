# Base Image
FROM node:10.19.0

# Set the working directory
RUN mkdir -p /usr/src/app/oracle
WORKDIR /usr/src/app/oracle

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/oracle/node_modules/.bin:$PATH

# Copy your app's source code from your host to your image filesystem.
COPY . .
RUN if test -d node_modules; then rm -r node_modules; fi

# Run the command inside your image filesystem
RUN yarn install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8001
EXPOSE 8002
EXPOSE 8081

# Run the specified command within the container.
CMD ["npm", "run", "start-dev"]
