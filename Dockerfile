FROM node:16

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm audit fix --force

# Bundle app source
COPY . .

EXPOSE 3000:3010

CMD [ "npm", "run","start" ]