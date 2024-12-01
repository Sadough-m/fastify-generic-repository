# Use Node.js as the base image
FROM node:21.1.0

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (ensure this matches the port used in Fastify)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
