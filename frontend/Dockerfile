FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY quiz/package.json .

RUN npm install

# Copy app files
COPY quiz/ .

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]