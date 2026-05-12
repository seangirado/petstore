# Research: PetStore Product Gallery

## Decision
Use a split fullstack architecture with a Spring Boot 3 backend written in Java 17+ and a Vite-powered React frontend built with Tailwind CSS and Material UI.

## Rationale
- The user explicitly requested Java Spring Boot, PostgreSQL, Docker, React, Tailwind, and MUI; this combination delivers a modern, maintainable fullstack application.
- Spring Boot 3 and Spring Data JPA provide robust REST API development, database integration, and easy data modeling for the pet catalog.
- React + Vite delivers a fast developer experience and optimized frontend build pipeline.
- Tailwind CSS together with MUI enables responsive utility-first layout with consistent, accessible UI components.
- Docker ensures local parity and makes Render free-tier deployment straightforward.
- PostgreSQL is a strong fit for catalog data, availability status, and query filtering needs.

## Alternatives considered
- Next.js or CRA for the frontend: rejected because the user specified Vite and the feature benefits from a lightweight, fast bundler for the initial gallery experience.
- Node.js/Express backend: rejected because the constitution and user request require Java Spring Boot.
- No separate API contract: rejected because explicit `/girado` endpoints are required by governance and keep frontend/backend integration clean.

## Deployment considerations
- Render free-tier compatibility requires lean Docker images and environment variable-driven configuration.
- The backend should be stateless and rely on PostgreSQL; cart/wishlist support can be backed by lightweight data structures or anonymous session keys.
- Frontend hosting can be done as a static site or separate service, while the API is hosted as a web service under Render.

## Research Findings
- `/girado` API namespace is mandatory by constitution, so all REST endpoints must use `/girado/*` paths.
- `com.girado.petstore` should be the Java package root for backend classes.
- The initial feature scope is browsing, details, filtering, and optional cart/wishlist support, which means the first iteration can delay authentication.
- Search and filter requirements can be implemented with query parameters on the pet listing endpoint.
