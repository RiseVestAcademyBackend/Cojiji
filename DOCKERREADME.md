## Follow the steps below to run the project using Docker

📦 Prerequisites

- Docker installed on your system
- .env file with necessary environment variables (if required)

P.S: If you'll be testing without the remote postgresDB:

ALTERNATIVE 1 (Use postgres installed on your local machine)
- Create the database on PgAdmin
- Update `DB_HOST=host.docker.internal` in your .env file instead of localhost

ALTERNATIVE 2 (Use postgres docker image):
- Run `docker run -d --name <container-name> -e POSTGRES_USER=<user> -e POSTGRES_PASSWORD=<password> -e POSTGRES_DB=<db-name> -p 5432:5432 postgres`
- Update your .env with the POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_D, container name as the host, and the Port used above.
- Use `docker exec -it <pg-container-name> psql -U <user>` to open PostgreSQL interactive terminal
- Create the database in the interactive shell using `CREATE DATABASE <database-name>;`
- Connect to the database using `docker exec -it <container-name> psql -U <user> -d <database-name>`


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
