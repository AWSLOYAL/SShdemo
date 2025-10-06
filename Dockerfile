# frappe_docker/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy app files into container
COPY app/package*.json ./
RUN npm install
COPY app ./

EXPOSE 3000
CMD ["node", "app.js"]
