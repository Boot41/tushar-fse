# Use Node.js 21 Alpine as the base image
FROM node:21-alpine

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    pango-dev \
    giflib-dev

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Create upload directory and set permissions
RUN mkdir -p uploads && chown -R node:node uploads

# Copy application files
COPY . .

# Create a .env file if it doesn't exist
RUN touch .env

# Switch to non-root user
USER node

# Expose port
EXPOSE 5000

# Start the application with no deprecation warnings
CMD ["node", "--no-deprecation", "index.js"]

# Start application
CMD ["node", "index.js"]