FROM node:16
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
# RUN openssl req \
#     -new \
#     -newkey rsa:4096 \
#     -days 365 \
#     -nodes \
#     -x509 \
#     -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" \
#     -keyout privkey.pem \
#     -out fullchain.pem
CMD ["npm","run" , "start"]
