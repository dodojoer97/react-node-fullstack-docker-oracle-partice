# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all remaining source code, including index.js and .env
COPY . .

# Expose port defined in .env (default to 3000)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
