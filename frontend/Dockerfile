FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN npm run build
CMD [ "npm", "run", "start"]