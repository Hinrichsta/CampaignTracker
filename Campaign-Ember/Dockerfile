FROM node:22-bookworm as builder

# set a directory for the app
WORKDIR /usr/src/app/

# copy all the files to the container
COPY . .

#Change Directory to run app
WORKDIR /usr/src/app/Campaign-Ember/

# install dependencies
RUN npm install --loglevel verbose

# Build the Ember App
RUN npm run build

# Production image
FROM nginx:bookworm

# Copy the built Ember app
COPY --from=builder /app/dist /usr/share/nginx/html