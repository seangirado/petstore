# Quickstart: PetStore Product Gallery

## Prerequisites

- Java 17+ installed
- Node.js 18+ installed
- PostgreSQL available locally or via Docker
- Docker installed for container builds

## Local Backend Setup

1. Configure PostgreSQL database access via environment variables:
   - `SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/petstore`
   - `SPRING_DATASOURCE_USERNAME=postgres`
   - `SPRING_DATASOURCE_PASSWORD=postgres`
   - `SPRING_JPA_HIBERNATE_DDL_AUTO=update`

2. Run the backend from the `backend/` directory:

```bash
cd backend
./mvnw spring-boot:run
```

3. Confirm the backend is running on `http://localhost:8080`.

## Local Frontend Setup

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the UI at the address shown by Vite, typically `http://localhost:5173`.

## Running the Fullstack App

- The frontend should call the backend API at `http://localhost:8080/girado`.
- Ensure the API base URL is configured in the frontend environment file.

## Docker and Render Compatibility

- Backend should be packaged as a Docker container suitable for Render's web service environment.
- Frontend can be deployed as a static site or as a separate service if desired.
- Use environment variables for all configuration so the same container image works in local and Render environments.

## Next Steps

- Add `backend/Dockerfile` and `frontend/Dockerfile`.
- Add a `docker-compose.yml` for local development if needed.
- Verify the `/girado` API endpoints and frontend base URL after scaffolding.
