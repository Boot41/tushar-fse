# Use an official Node.js runtime as the base image
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install MongoDB client tools (optional, for debugging or manual operations)
RUN apk add --no-cache mongodb-tools

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]