FROM node:10-alpine

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]