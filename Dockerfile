# Use official Node.js LTS alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Create directory for SQLite database file
RUN mkdir -p /app/data

# Expose app port
EXPOSE 3000

# Start from root server.js
CMD ["node", "server.js"]