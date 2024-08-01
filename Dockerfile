FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon

COPY . .
EXPOSE 5000

CMD ["nodemon", "backend/server.js"]
