FROM node:18-alpine

WORKDIR /app

# Install puppeteer dependencies and Chrome
RUN apk update && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Set environment variables for Chrome and Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copy application code
COPY . .

# Create test data directory and files for pdf-parse
RUN mkdir -p /app/node_modules/pdf-parse/test/data && \
    touch /app/node_modules/pdf-parse/test/data/05-versions-space.pdf && \
    mkdir -p /app/test/data && \
    touch /app/test/data/05-versions-space.pdf && \
    mkdir -p ./test/data && \
    touch ./test/data/05-versions-space.pdf

# Set default environment variables
ENV NODE_ENV=production \
    LOG_LEVEL=info \
    PORT=3001

EXPOSE 3001

# Use a non-root user for better security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Make sure chromium is accessible to the nodejs user
RUN mkdir -p /home/nodejs/.cache/puppeteer && \
    chown -R nodejs:nodejs /home/nodejs

USER nodejs

# Start the application
CMD ["npm", "start"]