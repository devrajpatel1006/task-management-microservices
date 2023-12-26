# Dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
# CMD [ "npm", "run", "start:prod" ]
# Start the server using the production build
CMD [ "node", "dist/main.js" ]