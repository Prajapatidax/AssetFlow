FROM node:18-alpine

WORKDIR /app

# Install dependencies first for caching
COPY package.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start Vite dev server with host listener
CMD ["npm", "run", "dev", "--", "--host"]
