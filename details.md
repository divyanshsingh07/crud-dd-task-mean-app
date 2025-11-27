## MEAN Tutorials CRUD – Project Guide

### 1. Project Overview
This repository contains a classic tutorials manager built with the MEAN stack:
- MongoDB stores tutorial documents (`title`, `description`, `published`, timestamps).
- Express + Node.js expose REST endpoints for creating, querying, updating, deleting tutorials, as well as filtering by title or published state.
- Angular 15 renders the client UI, calling the REST endpoints via `HttpClient` to keep the list of tutorials in sync with the backend in real time.

### 2. Repository Layout
```
crud-dd-task-mean-app/
├── backend/   # Express server, Mongoose models, routes, controllers
└── frontend/  # Angular client, services, components, assets
```

### 3. Backend Details (`backend/`)
- Entry point: `server.js` initializes Express, wires middleware (`cors`, JSON/urlencoded parsers), bootstraps MongoDB (see `app/models/index.js`) and registers the tutorial routes in `app/routes/turorial.routes.js`.
- Config: `app/config/db.config.js` stores the MongoDB connection string (`mongodb://localhost:27017/dd_db`). Override it through environment variables before deployment for better security.
- Data layer: `app/models/tutorial.model.js` defines the schema (title, description, published, timestamps) plus a custom `toJSON` method to remap `_id` to `id`.
- Controller: `app/controllers/tutorial.controller.js` contains all CRUD handlers. Highlights:
  - `create` validates payloads and defaults `published` to `false`.
  - `findAll` supports fuzzy title search (`?title=` query param).
  - `findAllPublished` lists only published tutorials.
  - `update`, `delete`, `deleteAll` expose public maintenance operations.
- Routes: `app/routes/turorial.routes.js` mounts the controller under `/api/tutorials`.
- Run locally:
  ```bash
  cd backend
  npm install
  node server.js   # listens on PORT (defaults to 8080)
  ```

### 4. Frontend Details (`frontend/`)
- Built with Angular 15 + TypeScript. The project scaffold lives under `src/app/`.
- Service layer: `src/app/services/tutorial.service.ts` targets `http://localhost:8080/api/tutorials` and exposes `getAll`, `get`, `create`, `update`, `delete`, `deleteAll`, `findByTitle`.
- Components:
  - `components/tutorials-list` shows the paginated list, allows selecting rows, filtering by title, wiping all tutorials.
  - `components/tutorial-details` displays the focused tutorial and supports publish/unpublish, update, delete actions.
  - `components/add-tutorial` provides a form to add new entries and toggle published status.
- Routing: `app-routing.module.ts` maps the landing route to the list view and exposes `/tutorials/:id` and `/add`.
- Run locally:
  ```bash
  cd frontend
  npm install
  ng serve --port 8081
  # Visit http://localhost:8081 (the Angular proxy hits the backend on 8080)
  ```

### 5. API Reference
Base URL: `http://<backend-host>:8080/api/tutorials`

| Method | Path            | Description                              |
|--------|-----------------|------------------------------------------|
| POST   | `/`             | Create a tutorial                        |
| GET    | `/`             | List tutorials (add `?title=foo` filter) |
| GET    | `/published`    | List only published tutorials            |
| GET    | `/:id`          | Retrieve a tutorial by id                |
| PUT    | `/:id`          | Update tutorial fields                   |
| DELETE | `/:id`          | Remove a tutorial                        |
| DELETE | `/`             | Remove all tutorials                     |

### 6. Local Development Workflow
1. Install dependencies in both `backend/` and `frontend/`.
2. Start MongoDB locally (default connection uses `mongodb://localhost:27017/dd_db`).
3. Run `node server.js` from `backend/`.
4. Run `ng serve --port 8081` from `frontend/`.
5. Navigate to `http://localhost:8081`, add tutorials, edit them, toggle published state, and observe API responses in the terminal logs.

### 7. Next Steps for Deployment
- Containerize backend and frontend with Dockerfiles targeting production builds.
- Compose stack should include MongoDB, backend, frontend, and an Nginx reverse proxy bound to port 80 (with playful-themed UI assets as per project requirement).
- Configure CI/CD (GitHub Actions or Jenkins) to build/push Docker images and redeploy automatically on your Ubuntu VM using Docker Compose.
