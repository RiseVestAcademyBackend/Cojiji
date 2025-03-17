## Follow the steps below to run the project using Docker

📦 Prerequisites

- Docker installed on your system
- .env file with necessary environment variables (if required)

P.S: If you'll be testing with a local postgres, run
`docker run --name pg -e POSTGRES_PASSWORD=<some-pg-password> -d postgres`
Then make sure to set `DB_HOST=host.docker.internal` in your .env file instead of localhost

🏗️ Build the Docker Image
To build the Docker image, run the following command:
`docker build -t <image-name:tag> .`

🚀 Run the Container
`docker run --env-file .env -d --name <container-name> -p 3000:3000 <image-name:tag>`

📌 Extras

- To list all running containers: `docker ps` or `docker ps -a` to include the stopped ones.
- To stop a container: `docker stop <container-id>`
- To remove a container: `docker rm <container-id>`
- To remove an image: `docker rmi <image-name>`
