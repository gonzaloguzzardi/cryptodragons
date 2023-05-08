# Base Image
FROM node:10.24.1

# Set the working directory
WORKDIR /usr/src/app

# Run the command inside your image filesystem
RUN echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list
RUN apt-get upgrade
RUN apt-get update
RUN apt-get install -y mongodb

# Specify the data volume to use for mongo
VOLUME ["/data/db"]
WORKDIR /data

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 27017
EXPOSE 28017

# Run the specified command within the container.
CMD ["mongod", "--smallfiles"]
