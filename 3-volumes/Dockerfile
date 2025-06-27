FROM node:20
WORKDIR /app
COPY package.json /app/
RUN npm install --omit=dev
COPY . /app/
EXPOSE 80
CMD ["node", "server.js"]