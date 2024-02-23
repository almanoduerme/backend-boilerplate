# Container.

# The base image for the container.
FROM node:20.11.1-slim

# Create a directory to hold the application code inside the image.
WORKDIR /app

# Copy the package.json and package-lock.json files into the image.
COPY package*.json ./

# Install the application's dependencies inside the image.
RUN npm install

# Copy the rest of the application's code into the image.
COPY . .

# The port the application will run on.
EXPOSE 8000

# The command to run the application.
CMD ["npm", "run", "dev"]