# Use the official Node.js  LTS image
FROM node:20.10.0-bullseye-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all local files to the working directory
COPY . .

# Build the TypeScript files
RUN npm run build

# Command to run the app
CMD ["npm", "start"]