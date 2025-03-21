# Use Node.js to build the React project
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy all files and build the React app
COPY . .
RUN npm run build

# Use a lightweight Nginx image to serve the app
FROM nginx:alpine

# Copy build files to Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
