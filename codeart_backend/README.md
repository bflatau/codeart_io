# awasite-api


To Stop compose file
`docker-compose stop`

To Start again:
`docker-compose start`

generate rsa keys:
`openssl genpkey -algorithm RSA -out rsa_private.pem -pkeyopt rsa_keygen_bits:2048`
`openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem`


npm install cors body-parser express



run docker compose:
`sudo docker-compose up -d`

docker compse logs
`sudo docker-compose logs`

docker compose certbot
`sudo docker-compose up -d certbot`

docker compose webserver
`sudo docker-compose up -d webserver`

docker look in webserver container
`docker-compose exec nodejs ls -la`

rebuild component:
`docker-compose up -d --force-recreate --build nodejs`

