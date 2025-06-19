# 🚀 React + Node.js Fullstack App (Dockerized + NGINX + Vite)

This project is a **fully containerized fullstack web application** built with:

- **Frontend**: Vite + React
- **Backend**: Node.js + Express
- **Proxy**: NGINX
- **Containerization**: Docker & Docker Compose

It demonstrates a real-world, production-style deployment of a frontend app and REST API, served through an NGINX reverse proxy — with no need to pre-build manually.

---

## 📁 Project Structure

```bash
practice/
├── frontend/               # React + Vite app
│   ├── Dockerfile          # Builds frontend (multi-stage)
│   ├── src/                # React source code
│   └── dist/               # Build output (generated inside container)
├── backend/                # Node.js + Express API
│   ├── Dockerfile
│   ├── index.js            # API entry point
│   └── .env                # Port & API key
├── nginx/                 
│   ├── Dockerfile          # Builds final NGINX image
│   └── default.conf        # NGINX reverse proxy config
└── docker-compose.yml      # All-in-one runner
```

---

## ⚙️ Features

* 🌐 NGINX serves static frontend and proxies `/api` to backend
* 🧱 Multi-stage Docker builds — no need to pre-build anything
* 🧪 API endpoint returns sample JSON data
* 🔀 Clean routing for SPAs (via `try_files /index.html`)
* 💬 Environment variables supported via `.env` (e.g. `PORT`, `API_KEY`)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd practice
```

---

### 2. Start the app

```bash
docker compose up --build
```

---

### 3. Open in your browser

* Frontend: [http://localhost](http://localhost)
* API: [http://localhost/api/items](http://localhost/api/items)

---

## 🔁 Example API Response

```
GET /api/items → JSON:

[
  { "id": 1, "name": "Apple" },
  { "id": 2, "name": "Banana" },
  { "id": 3, "name": "Orange" }
]
```

---

## 🔐 .env (for backend)

Example:

```env
PORT=3000
API_KEY=abc123
```

---

## 🧱 Architecture Breakdown

### 🐳 `docker-compose.yml`

```yaml
version: '3'

services:
  frontend-builder:
    build:
      context: ./frontend
    image: frontend-builder

  backend:
    build: ./backend
    ports:
      - "3000:3000"

  nginx:
    build:
      context: ./nginx
    ports:
      - "80:80"
    depends_on:
      - backend
      - frontend-builder
```

### 🔍 What each service does:

#### ✅ `frontend-builder`:

* Builds the React app using `npm run build`
* Does not run a dev server or expose any ports
* Output (`dist/`) is copied by the NGINX container

#### ✅ `backend`:

* Runs a Node + Express server
* Exposes port `3000` to the host and other containers
* Handles `/api/items` and `/api/key` routes

#### ✅ `nginx`:

* Builds its own container using `nginx/Dockerfile`
* Serves static frontend from `/usr/share/nginx/html`
* Proxies `/api/*` to the backend via Docker internal network

---

### 🐳 `frontend/Dockerfile`

```Dockerfile
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build
```

> Multi-stage builder. Output is `/app/dist`.

---

### 🐳 `backend/Dockerfile`

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
EXPOSE 3000
```

> Simple Node.js app that reads from `.env`.

---

### 🐳 `nginx/Dockerfile`

```Dockerfile
FROM nginx:stable
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
```

> Final container that includes both frontend and config.

---

### 🧠 Why ports are needed in Compose

```yaml
ports:
  - "3000:3000"   # backend
  - "80:80"       # nginx
```

These **map container ports to the host**, so:

* You can access `http://localhost`
* API requests from browser → NGINX → backend

---

## 🧹 Cleanup

```bash
docker compose down --volumes --remove-orphans
```

---

## 📦 Production Ready?

Absolutely — just add:

* SSL with Let's Encrypt
* JWT/Auth middleware
* Volume persistence
* CI/CD pipeline (e.g. GitHub Actions)

---

## 📄 License

MIT – use freely for learning or launching 🚀
---

## 🌐 Accessing from a Remote VM

If you're deploying this project on a cloud VM (e.g., Oracle Cloud, AWS, etc.), use the **VM's public IP** to access the app from your local browser:

```
http://<VM-IP>
```

### Example

If your VM IP is `129.149.111.4`, open:

- Frontend: [129.149.111.4](129.149.111.4)
- API: [129.149.111.4/api/items](129.149.111.4/api/items)

> Make sure ports `80` (for HTTP) and `3000` (if directly accessing backend) are open in your VM firewall or cloud provider's security rules.