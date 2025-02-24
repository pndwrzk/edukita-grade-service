# Edukita Grade Service

This service provides an API for managing grades on the Edukita platform.

## Initial Setup

Before running the service, ensure you have Docker and Docker Compose installed on your system.

### Environment Configuration

1.  **Duplicate Environment File:** Copy the `.env.example` file and rename it to `.env`.
    ```bash
    cp .env.example .env
    ```
2.  **Configure Variables:** Open the `.env` file and adjust the values of the variables inside according to your system configuration.  Pay attention to the database configuration, ports, and other important variables.

## Running the Service with Docker Compose

To run the service, use the following command:

```bash
docker-compose up -d --build
```



###  Database Migration

After the service is running, you need to perform a database migration to create the necessary tables.

1.  **Enter the Container:** Access the shell inside the edukita-grade-service container using the following command:
    ```bash
    docker exec -it edukita-grade-service sh
    ```

1.  **Run the Migration:** Inside the container shell, run the following command to execute the migration:
    ```bash
    docker exec -it edukita-grade-service sh
    ```