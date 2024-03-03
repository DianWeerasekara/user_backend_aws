# Use official Node.js image as base
FROM node:20.9.0

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 9000
EXPOSE 9000

# Command to run the application
CMD ["node", "app.js"]
