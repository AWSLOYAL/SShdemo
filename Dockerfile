# Use official Node LTS alpine image
FROM node:18-alpine

WORKDIR /usr/src/app

# Install only production dependencies at build time
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
