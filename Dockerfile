FROM node:20-alpine As builder
RUN apk --no-cache add git
WORKDIR /app

COPY package.json package-lock.json ./
RUN git config --global url."https://".insteadOf git://
RUN yarn install
COPY . .
RUN  npm run build --configuration=production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/www/ /usr/share/nginx/html
