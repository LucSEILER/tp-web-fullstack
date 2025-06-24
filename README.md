# GameRadar 🎮

**GameRadar** is a microservices-based web application that allows users to search, explore, and manage their video game collection. It integrates data from the external [IGDB API](https://api-docs.igdb.com/) and offers features for organizing games, adding reviews, and tracking progress.

---

## 🧱 Project Structure

GameRadar is divided into three main components:

- **WebApp** – The frontend (React-based) interface for users (not implemented yet).
- **API Gateway** – A Node.js TypeScript service acting as a reverse proxy/router for backend services.
- **Microservices**:
  - `user-service` – Manages user data, authentication, and personal libraries.
  - `videogame-service` – Handles video game data, connects to the IGDB API, and manages local game info.

Each service is containerized using Docker and has its own `docker-compose.yml` and `Dockerfile`.

---

## 🗂 Folder Structure

Each service has the following structure (example: `user-service`):

```
user-service/
├── data/
├── dist/
├── node_modules/
├── src/
│   ├── controllers/         # Business logic for handling requests
│   ├── models/              # Mongoose schemas or DB models
│   ├── routes/              # Express route definitions
│   └── services/            # Utility and core logic
│       ├── auth.ts
│       ├── user.ts
│       ├── logging.ts
│       └── server.ts
├── .prettierrc              # Prettier config
├── docker-compose.yml       # Docker Compose config
├── Dockerfile               # Docker image definition
├── eslint.config.mjs        # ESLint config
├── nodemon.json             # Nodemon config (dev only)
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Exact dependency tree
└── tsconfig.json            # TypeScript config
```

---

## 🚀 Starting the project

### Step 1 - Requirements

Please be sure to have the following packages installed :

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) [Node.js](https://nodejs.org/) for local developement

---

### Step 2 - How to start

When you are in the root directory, execute the following script

```bash
start.bat
```

Then you can access the API Gateway with the port [4000](http//localhost:4000).

You have to access to **/auth** to access the user-service, and **/videogame** to access the videogame-service.

### Step 3 (If network problem)

If the shared Docker network doesn’t exist, create it manually:

```
docker network create --driver bridge gameradar-network
```

This network allows all containers from each service to communicate with one another.
