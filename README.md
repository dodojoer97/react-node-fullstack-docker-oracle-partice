# 🚀 React + Node.js Fullstack App (Dockerized + NGINX + Vite)

This project is a **fully containerized fullstack web application** built with:

* **Frontend**: Vite + React
* **Backend**: Node.js + Express
* **Proxy**: NGINX
* **Containerization**: Docker & Docker Compose

It demonstrates a real-world, production-style deployment of a frontend app and REST API, served through an NGINX reverse proxy — with hot reload in dev mode and static serving in production.

---

## 📁 Project Structure

```
practice/
├── frontend/               # React + Vite app
│   ├── Dockerfile
│   ├── vite.config.js      # Vite dev server config
├── backend/                # Node.js + Express API
│   ├── Dockerfile
│   └── index.js
├── nginx/
│   ├── Dockerfile          # Prod build
│   ├── default.conf        # Used in production
│   └── dev.conf            # Used in development (proxy to Vite)
├── docker-compose.yml      # Production setup
├── docker-compose.dev.yml  # Dev override with hot reload
└── .env                    # Environment variables
```

---

## ⚙️ Features

* 🌐 NGINX serves static frontend (prod) and proxies to Vite dev server (dev)
* 🧱 Multi-stage Docker builds for optimized production
* 🔁 Hot Module Reloading (HMR) in development via Vite
* 🔀 Clean SPA routing via `try_files`
* 💬 Supports `.env`-based config for backend

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd practice
```

### 2. Create a `.env` file

```env
BACKEND_PORT=3000
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=myapp
NGINX_PORT=80
```

---

## 🧪 Running in Production

```bash
docker compose up --build
```

* Frontend: [http://localhost](http://localhost)
* API: [http://localhost/api/items](http://localhost/api/items)

---

## 🔁 Running in Development (with HMR through NGINX)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

* App (via NGINX): [http://localhost:80](http://localhost:80)
* Vite (direct): [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)

### 📄 Dev Highlights

* Vite dev server exposes HMR and is proxied via NGINX
* NGINX config `nginx/dev.conf` routes `/` → Vite, `/api` → backend

---

## 🔐 API Sample

```json
GET /api/items
[
  { "id": 1, "name": "Apple" },
  { "id": 2, "name": "Banana" },
  { "id": 3, "name": "Orange" }
]
```

---

## 🧹 Cleanup

```bash
docker compose down --volumes --remove-orphans
```

---

## 📦 Ready for Production

* ✅ Clean separation between dev and prod configs
* ✅ NGINX reverse proxy + static serving
* ✅ Can add Let's Encrypt, JWT auth, object storage, CI/CD

---

## 🌐 Remote Access

If deploying to a VM:

```
http://<VM-IP>
```

Make sure ports `80`, `443`, and `3000` are allowed in the firewall/security group.

---

## 📝 License

MIT – use freely for learning or launching 🚀
