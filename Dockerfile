# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
