# Base Image
FROM node:lts-slim

# Set the working directory
RUN mkdir -p /usr/src/app/web
WORKDIR /usr/src/app/web

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/web/node_modules/.bin:$PATH

# Copy the file from your host to your current location
COPY package.json .

# Run the command inside your image filesystem
RUN npm install
RUN npm install react-scripts@3.3.0 -g --silent

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD [ "npm", "start" ]
