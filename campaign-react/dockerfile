FROM node:18

# set a directory for the app
WORKDIR /usr/src/app

# copy all the files to the container
COPY package*.json ./

# Install Dependencis
RUN npm install --legacy-peer-deps

# Copy all the files into the directory
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start in Production Mode
CMD ["npm", "run", "dev"]