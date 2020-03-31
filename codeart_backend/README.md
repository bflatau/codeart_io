# CodeArt: I/O API

rebuild component:
`docker-compose up -d --force-recreate --build nodejs`


create new nodejs image for multiple node instances (mind the dot at the end):
`docker build -t IMAGENAME .`

example docker-compose snippet that ties into the app/docker network (note the image just created is referenced and the container name is references in NGINX
` nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: IMAGENAME
    container_name: codeartnodev`
