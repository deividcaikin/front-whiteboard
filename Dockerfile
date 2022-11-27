FROM node:12.16.3-alpine
#ENV NODE_ENV production
# Create app directory
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf
COPY  --from=build /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]


