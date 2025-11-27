# MEAN Stack Tutorials CRUD Application - Complete Project Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Complete File Structure](#complete-file-structure)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [API Documentation](#api-documentation)
7. [Local Development Setup](#local-development-setup)
8. [Docker & Containerization](#docker--containerization)
9. [CI/CD Pipeline](#cicd-pipeline)
10. [Deployment Guide](#deployment-guide)

---

## 🎯 Project Overview

This is a full-stack **MEAN** (MongoDB, Express, Angular, Node.js) application for managing tutorials. The application provides a complete CRUD (Create, Read, Update, Delete) interface where users can:

- Create new tutorials with title, description, and published status
- View all tutorials in a list
- Search tutorials by title
- Update existing tutorials
- Delete individual or all tutorials
- Filter published/unpublished tutorials

### Key Features

- **RESTful API** backend with Express.js
- **Angular 15** single-page application (SPA)
- **MongoDB** database with Mongoose ODM
- **Docker** containerization for easy deployment
- **CI/CD** pipeline with GitHub Actions
- **Nginx** reverse proxy for production deployment

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Frontend
- **Angular 15** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Bootstrap 4** - CSS framework
- **Angular HttpClient** - HTTP client service

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server and reverse proxy
- **GitHub Actions** - CI/CD automation
- **MongoDB 6** - Database (containerized)

---

## 📁 Complete File Structure

```
crud-dd-task-mean-app/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline
│
├── backend/                       # Node.js + Express Backend
│   ├── app/
│   │   ├── config/
│   │   │   └── db.config.js       # MongoDB connection configuration
│   │   ├── controllers/
│   │   │   └── tutorial.controller.js  # CRUD operation handlers
│   │   ├── models/
│   │   │   ├── index.js           # Database initialization
│   │   │   └── tutorial.model.js # Mongoose schema definition
│   │   └── routes/
│   │       └── turorial.routes.js # Express route definitions
│   ├── Dockerfile                 # Backend container definition
│   ├── package.json               # Backend dependencies
│   ├── package-lock.json          # Dependency lock file
│   └── server.js                  # Express server entry point
│
├── docker/                        # Docker configuration files
│   ├── docker-compose.yml         # Multi-container orchestration
│   └── nginx.conf                 # Nginx reverse proxy configuration
│
├── frontend/                      # Angular 15 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── add-tutorial/  # Add new tutorial component
│   │   │   │   │   ├── add-tutorial.component.ts
│   │   │   │   │   ├── add-tutorial.component.html
│   │   │   │   │   ├── add-tutorial.component.css
│   │   │   │   │   └── add-tutorial.component.spec.ts
│   │   │   │   ├── tutorial-details/  # Tutorial details/edit component
│   │   │   │   │   ├── tutorial-details.component.ts
│   │   │   │   │   ├── tutorial-details.component.html
│   │   │   │   │   ├── tutorial-details.component.css
│   │   │   │   │   └── tutorial-details.component.spec.ts
│   │   │   │   └── tutorials-list/    # Tutorials list component
│   │   │   │       ├── tutorials-list.component.ts
│   │   │   │       ├── tutorials-list.component.html
│   │   │   │       ├── tutorials-list.component.css
│   │   │   │       └── tutorials-list.component.spec.ts
│   │   │   ├── models/
│   │   │   │   ├── tutorial.model.ts      # Tutorial TypeScript interface
│   │   │   │   └── tutorial.model.spec.ts
│   │   │   ├── services/
│   │   │   │   ├── tutorial.service.ts    # HTTP service for API calls
│   │   │   │   └── tutorial.service.spec.ts
│   │   │   ├── app.component.ts           # Root component
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.module.ts              # Root module
│   │   │   └── app-routing.module.ts      # Angular routing configuration
│   │   ├── assets/                 # Static assets (images, fonts, etc.)
│   │   ├── index.html              # Main HTML template
│   │   ├── main.ts                 # Application entry point
│   │   ├── styles.css              # Global styles
│   │   └── favicon.ico             # Site icon
│   ├── dist/                       # Production build output (generated)
│   │   └── angular-15-crud/
│   ├── Dockerfile                  # Frontend container definition
│   ├── angular.json                 # Angular CLI configuration
│   ├── package.json                 # Frontend dependencies
│   ├── package-lock.json            # Dependency lock file
│   ├── tsconfig.json                # TypeScript compiler configuration
│   ├── tsconfig.app.json            # App-specific TypeScript config
│   └── tsconfig.spec.json           # Test TypeScript config
│
├── EC2-SETUP.md                    # EC2 VM setup instructions
├── details.md                      # This file - project documentation
└── README.md                       # Quick start guide
```

---

## 🔧 Backend Architecture

### Entry Point: `server.js`

The Express server initialization file that:
- Configures CORS middleware
- Sets up JSON and URL-encoded body parsers
- Connects to MongoDB using Mongoose
- Registers tutorial routes
- Starts the server on port 8080 (or `process.env.PORT`)

### Configuration: `app/config/db.config.js`

MongoDB connection configuration:
- Default: `mongodb://localhost:27017/dd_db`
- Production: Uses `MONGODB_URI` environment variable
- Supports both local and containerized MongoDB instances

### Data Model: `app/models/tutorial.model.js`

Mongoose schema definition:
```javascript
{
  title: String,        // Tutorial title (required)
  description: String,  // Tutorial description
  published: Boolean,   // Publication status (default: false)
  createdAt: Date,     // Auto-generated timestamp
  updatedAt: Date      // Auto-generated timestamp
}
```

The model includes a custom `toJSON` method that transforms `_id` to `id` for API responses.

### Controller: `app/controllers/tutorial.controller.js`

Contains all business logic handlers:

| Method | Function | Description |
|--------|----------|-------------|
| `create` | POST | Creates a new tutorial (validates title) |
| `findAll` | GET | Retrieves all tutorials (supports `?title=` query filter) |
| `findOne` | GET | Retrieves a single tutorial by ID |
| `update` | PUT | Updates a tutorial by ID |
| `delete` | DELETE | Deletes a tutorial by ID |
| `deleteAll` | DELETE | Deletes all tutorials |
| `findAllPublished` | GET | Retrieves only published tutorials |

### Routes: `app/routes/turorial.routes.js`

Express router configuration:
- Base path: `/api/tutorials`
- Maps HTTP methods to controller functions
- Supports query parameters for filtering

### Dependencies

```json
{
  "express": "^4.18.2",    // Web framework
  "mongoose": "^6.8.1",    // MongoDB ODM
  "cors": "^2.8.5"         // CORS middleware
}
```

---

## 🎨 Frontend Architecture

### Root Module: `app.module.ts`

Angular root module that:
- Imports necessary Angular modules (HttpClientModule, FormsModule, RouterModule)
- Declares all components
- Provides services
- Configures routing

### Routing: `app-routing.module.ts`

Defines application routes:
- `/` - Tutorials list view
- `/tutorials/:id` - Tutorial details/edit view
- `/add` - Add new tutorial form

### Service Layer: `app/services/tutorial.service.ts`

Angular service that handles all HTTP communication:

```typescript
- getAll(): Observable<Tutorial[]>           // Get all tutorials
- get(id): Observable<Tutorial>              // Get single tutorial
- create(data): Observable<any>              // Create tutorial
- update(id, data): Observable<any>          // Update tutorial
- delete(id): Observable<any>                // Delete tutorial
- deleteAll(): Observable<any>               // Delete all tutorials
- findByTitle(title): Observable<Tutorial[]> // Search by title
```

**Base URL**: `http://localhost:8080/api/tutorials` (configurable for production)

### Components

#### 1. **Tutorials List** (`tutorials-list/`)
- Displays all tutorials in a table
- Search functionality (filters by title)
- Delete individual tutorials
- Delete all tutorials button
- Navigate to details/edit view
- Navigate to add new tutorial

#### 2. **Tutorial Details** (`tutorial-details/`)
- Displays selected tutorial information
- Edit tutorial form
- Toggle published status
- Update tutorial
- Delete tutorial
- Navigate back to list

#### 3. **Add Tutorial** (`add-tutorial/`)
- Form to create new tutorial
- Fields: title, description, published checkbox
- Submit to create new tutorial
- Navigate back to list after creation

### Data Model: `app/models/tutorial.model.ts`

TypeScript interface:
```typescript
export interface Tutorial {
  id?: string;
  title: string;
  description?: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Dependencies

**Production:**
- `@angular/core`, `@angular/common`, `@angular/router` - Angular framework
- `rxjs` - Reactive programming
- `bootstrap` - CSS framework

**Development:**
- `@angular/cli` - Angular CLI tools
- `typescript` - TypeScript compiler
- `karma`, `jasmine` - Testing framework

---

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:8080/api/tutorials`
- **Production**: `http://<your-domain>/api/tutorials`

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| **POST** | `/` | Create new tutorial | `{ title, description?, published? }` | Created tutorial object |
| **GET** | `/` | Get all tutorials | - | Array of tutorials |
| **GET** | `/?title=<search>` | Search by title | - | Filtered array |
| **GET** | `/published` | Get published tutorials | - | Array of published tutorials |
| **GET** | `/:id` | Get tutorial by ID | - | Tutorial object |
| **PUT** | `/:id` | Update tutorial | `{ title?, description?, published? }` | Success message |
| **DELETE** | `/:id` | Delete tutorial | - | Success message |
| **DELETE** | `/` | Delete all tutorials | - | Success message with count |

### Request/Response Examples

**Create Tutorial:**
```bash
POST /api/tutorials
Content-Type: application/json

{
  "title": "Angular Basics",
  "description": "Learn Angular fundamentals",
  "published": true
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Angular Basics",
  "description": "Learn Angular fundamentals",
  "published": true,
  "createdAt": "2025-11-27T10:00:00.000Z",
  "updatedAt": "2025-11-27T10:00:00.000Z"
}
```

**Get All Tutorials:**
```bash
GET /api/tutorials
```

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Angular Basics",
    "description": "Learn Angular fundamentals",
    "published": true
  }
]
```

---

## 💻 Local Development Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or Docker)
- **Angular CLI** (install globally: `npm install -g @angular/cli`)

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd crud-dd-task-mean-app
```

### Step 2: Backend Setup

  ```bash
  cd backend
  npm install
```

**Configure MongoDB:**
- Edit `app/config/db.config.js` if using non-default MongoDB connection
- Or set `MONGODB_URI` environment variable

**Start MongoDB:**
```bash
# If installed locally
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:6
```

**Start Backend Server:**
```bash
node server.js
# Server runs on http://localhost:8080
```

### Step 3: Frontend Setup

  ```bash
  cd frontend
  npm install
```

**Start Development Server:**
```bash
  ng serve --port 8081
# Application runs on http://localhost:8081
```

### Step 4: Access Application

Open browser and navigate to: `http://localhost:8081`

### Development Workflow

1. Backend runs on port **8080**
2. Frontend runs on port **8081**
3. Frontend makes API calls to `http://localhost:8080/api/tutorials`
4. MongoDB stores data in `dd_db` database

---

## 🐳 Docker & Containerization

### Dockerfiles

#### Backend Dockerfile (`backend/Dockerfile`)

Multi-stage build:
- Uses `node:18-alpine` base image
- Installs production dependencies
- Copies application code
- Exposes port 8080
- Runs `node server.js`

#### Frontend Dockerfile (`frontend/Dockerfile`)

Multi-stage build:
- **Build stage**: Uses `node:18-alpine` to build Angular app
- **Production stage**: Uses `nginx:stable-alpine` to serve static files
- Copies built files from `dist/angular-15-crud` to nginx html directory
- Exposes port 80

### Docker Compose (`docker/docker-compose.yml`)

Orchestrates three services:

1. **MongoDB** (`mongo`)
   - Image: `mongo:6`
   - Port: 27017 (internal)
   - Volume: `mongo-data` for persistence
   - Database: `dd_db`

2. **Backend** (`backend`)
   - Builds from `../backend/Dockerfile`
   - Environment: `MONGODB_URI=mongodb://mongo:27017/dd_db`
   - Port: 8080 (internal)
   - Depends on: `mongo`

3. **Frontend** (`frontend`)
   - Builds from `../frontend/Dockerfile`
   - Port: 80 (mapped to host)
   - Mounts: `docker/nginx.conf` for reverse proxy
   - Depends on: `backend`

### Nginx Configuration (`docker/nginx.conf`)

Reverse proxy configuration:
- Serves Angular app from `/usr/share/nginx/html`
- Proxies `/api/` requests to `backend:8080`
- Handles SPA routing with `try_files`

### Running with Docker Compose

```bash
# From project root
docker compose -f docker/docker-compose.yml build
docker compose -f docker/docker-compose.yml up -d

# View logs
docker compose -f docker/docker-compose.yml logs -f

# Stop services
docker compose -f docker/docker-compose.yml down
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/ci-cd.yml`)

Automated pipeline triggered on push to `main` branch:

#### Job 1: Build & Push

1. **Checkout** code from repository
2. **Setup** Docker Buildx and QEMU
3. **Login** to Docker Hub using secrets
4. **Build & Push** backend image:
   - Tags: `latest` and `git-sha`
   - Pushes to: `DOCKERHUB_USERNAME/dd-mean-backend`
5. **Build & Push** frontend image:
   - Tags: `latest` and `git-sha`
   - Pushes to: `DOCKERHUB_USERNAME/dd-mean-frontend`

#### Job 2: Deploy

1. **SSH** into remote server (EC2 VM)
2. **Create** deployment directory
3. **Generate** `docker-compose.yml` with latest images
4. **Pull** latest images from Docker Hub
5. **Restart** containers with new images

### Required GitHub Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DOCKERHUB_USERNAME` | Docker Hub username | `arshthakur` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | `dckr_pat_...` |
| `SERVER_IP` | EC2 instance public IP | `3.110.49.228` |
| `SERVER_USER` | SSH username | `ubuntu` |
| `SERVER_SSH_KEY` | SSH private key content | `-----BEGIN OPENSSH...` |
| `SERVER_SSH_PORT` | SSH port (optional) | `22` |

### Workflow Execution

1. Developer pushes code to `main` branch
2. GitHub Actions triggers workflow
3. Images are built and pushed to Docker Hub
4. Deployment script runs on EC2 VM
5. Application is updated with zero downtime

---

## 🌐 Deployment Guide

### Prerequisites

- Ubuntu EC2 instance (or similar VM)
- Docker and Docker Compose installed
- Security group configured (ports 22, 80)
- GitHub repository with secrets configured

### Step 1: EC2 Setup

Follow the detailed guide in `EC2-SETUP.md`:

1. Connect to EC2 via SSH
2. Install Docker and Docker Compose
3. Configure user permissions
4. Create deployment directory
5. Configure security groups

### Step 2: GitHub Configuration

1. Add all required secrets in repository settings
2. Ensure workflow file is in `.github/workflows/`
3. Push code to `main` branch

### Step 3: Automatic Deployment

Once setup is complete:
- Every push to `main` triggers automatic deployment
- GitHub Actions builds and pushes images
- Server automatically pulls and restarts containers

### Step 4: Access Application

- Application available at: `http://<your-server-ip>`
- API endpoints: `http://<your-server-ip>/api/tutorials`

### Manual Deployment (If Needed)

```bash
# SSH into server
ssh ubuntu@<server-ip>

# Navigate to deployment directory
cd ~/deploy/dd-mean-app

# Pull latest images
docker compose pull

# Restart containers
docker compose up -d --remove-orphans

# Check status
docker compose ps

# View logs
docker compose logs -f
```

### Monitoring & Maintenance

**Check Container Status:**
```bash
docker compose ps
```

**View Logs:**
```bash
docker compose logs -f
docker compose logs backend
docker compose logs frontend
docker compose logs mongo
```

**Restart Services:**
```bash
docker compose restart backend
docker compose restart frontend
```

**Stop Application:**
```bash
docker compose down
```

**Stop and Remove Volumes (⚠️ Deletes Data):**
```bash
docker compose down -v
```

---

## 📝 Additional Notes

### Environment Variables

**Backend:**
- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment (production/development)
- `MONGODB_URI` - MongoDB connection string

**Frontend:**
- API base URL configured in `tutorial.service.ts`
- Update for production deployment

### Database Persistence

- MongoDB data persisted in Docker volume: `mongo-data`
- Volume survives container restarts
- To backup: `docker run --rm -v mongo-data:/data -v $(pwd):/backup mongo tar czf /backup/mongo-backup.tar.gz /data`

### Security Considerations

- Use environment variables for sensitive data
- Configure CORS appropriately for production
- Use HTTPS in production (Let's Encrypt)
- Secure MongoDB with authentication
- Use strong SSH keys
- Restrict security group access

### Troubleshooting

**Backend won't connect to MongoDB:**
- Check `MONGODB_URI` environment variable
- Verify MongoDB container is running
- Check network connectivity between containers

**Frontend can't reach API:**
- Verify Nginx configuration
- Check backend container is running
- Verify API base URL in service

**Containers won't start:**
- Check Docker logs: `docker compose logs`
- Verify images exist: `docker images`
- Check disk space: `df -h`

---

## 📚 Resources

- [Angular Documentation](https://angular.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is part of a DevOps internship assignment.

---

**Last Updated**: November 27, 2025
