FROM node:18-bookworm-slim

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
