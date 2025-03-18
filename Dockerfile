FROM node:23.10-alpine3.21

# Set working directory
WORKDIR /cojiji

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app's code
COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "./bin/www"]