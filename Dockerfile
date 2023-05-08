FROM node:16 as builder 
WORKDIR usr/src/app
COPY package*.json .
RUN npm install --force 
COPY . . 
RUN npm run build 

# Use ubuntu-latest as the base image
FROM ubuntu:latest

# Update the package lists and install necessary dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && apt-get clean

# Install your database dependencies (e.g., MySQL, PostgreSQL)
RUN apt-get install -y mysql-client

# Set the working directory
WORKDIR usr/src/app

# Copy application code to the container
COPY --from=builder user/src/app/dist ./dist

# Run any setup scripts for the database
RUN ./setup-db.sh

# Expose any necessary ports for your server
EXPOSE 8000

# Start your server
CMD [ "npm", "start" ]