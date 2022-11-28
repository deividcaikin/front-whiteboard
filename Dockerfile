FROM node

WORKDIR /app
COPY . .

RUN npm install

RUN CI=false npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD ["npx", "serve","build"]



