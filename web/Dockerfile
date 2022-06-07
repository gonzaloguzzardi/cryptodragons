# Base Image
FROM node:16.14.2

# Set the working directory
RUN mkdir -p /usr/src/app/web
WORKDIR /usr/src/app/web

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/web/node_modules/.bin:$PATH

# Copy your app's source code from your host to your image filesystem.
COPY . .
RUN if test -d node_modules; then rm -r node_modules; fi

# Run the command inside your image filesystem
RUN apt-get update
RUN npm install --legacy-peer-deps --silent

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD ["npm", "run", "dev"]
