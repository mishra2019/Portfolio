# Roshan Mishra — Portfolio

A full-width, animated portfolio built with the **MERN-style** stack: **React 19** + **Vite** + **TypeScript** + **Tailwind CSS** on the client, **Express** + **MongoDB** (Mongoose) for the API. Content is loaded from `GET /api/portfolio` (proxied to the API in dev).

---

## Project Structure

```
src/
├── server/                    # Express + MongoDB API
│   ├── seed/portfolio-seed.json   # Default portfolio document (edit + re-seed)
│   ├── src/
│   │   ├── index.js           # HTTP server, routes, auto-seed if DB empty
│   │   ├── seed.js            # Manual re-seed (clears slug `main`)
│   │   └── models/Portfolio.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/        # UI + portfolio sections
    │   ├── hooks/PortfolioProvider.tsx   # TanStack Query → /api/portfolio
    │   ├── lib/api.ts
    │   └── types/portfolio.ts
    └── vite.config.js         # proxies /api → http://127.0.0.1:3001
```

---

## How to Run Locally

### Prerequisites

- **Node.js** v18+ and **npm** v9+ (see root `package.json` → `engines`)
- **MongoDB** running locally or a cloud URI (default: `mongodb://127.0.0.1:27017/portfolio`)

### 1. Install once (repo root)

```bash
cd /path/to/untitled   # your clone path
npm install
```

This installs all **workspace** packages (`src/frontend`, `src/server`).

### 2. Environment (optional)

If you skip this, the API uses `mongodb://127.0.0.1:27017/portfolio` and logs a reminder.

```bash
cp src/server/.env.example src/server/.env
# Edit MONGODB_URI and/or PORT as needed
```

You can also put a `.env` at the **repo root**; the server loads root `.env` first, then `src/server/.env`.

### 3. Start the app

**Recommended — API + frontend together** (from **repo root**):

```bash
npm run dev
```

- Runs the API with **nodemon** (auto-restart on `src/server/src` changes) and the Vite dev server.
- **Frontend:** http://127.0.0.1:5000 (or http://localhost:5000)  
- **API:** http://127.0.0.1:3001  
- In dev, Vite **proxies** `/api/*` → the API on port **3001** (`src/frontend/vite.config.js`).

**From repo root** (same workspaces, two shortcuts):

| Command | What it runs |
|---------|----------------|
| `npm run start:server` | API only (`nodemon` in `src/server`) |
| `npm run start:frontend` | Vite only (`npm start` in `src/frontend`) |

**From package folders** (two terminals if you want them separate):

| Path | Command | Notes |
|------|---------|--------|
| `src/server` | `npm run dev` | **nodemon** — dev API on port **3001** |
| `src/server` | `npm start` | **node** — production-style API (no file watching) |
| `src/frontend` | `npm start` | Vite dev server on port **5000** (same as `npm run dev` there) |

If you only run the **frontend**, start the **API** as well or `/api/portfolio` will fail (nothing to proxy to).

### Database seeding

On first API start with an **empty** database, the server inserts `src/server/seed/portfolio-seed.json` for slug `main`.

To **reset** from the seed file (clears slug `main` and re-inserts):

```bash
cd src/server && npm run seed
```

### Production API URL (hosted separately)

If the built React app is not served behind the same origin as the API, set at **build** time:

`VITE_API_BASE_URL=https://your-api.example.com`

---

## Customizing the Portfolio

1. Edit **`src/server/seed/portfolio-seed.json`** (or update the document in MongoDB directly).
2. **Push changes into MongoDB** — the UI reads from the API/DB, not from the JSON file at runtime. If you already have a `main` document (e.g. old sample data), run:
   - **`npm run seed`** from the **repo root**, or
   - **`npm run seed`** from **`src/server`**  
   That replaces slug `main` with the current seed file. (A totally empty database is auto-seeded once on first API start only.)
3. Rebuild the frontend if you ship **`src/frontend/dist/`**: **`npm run build -w @roshan/portfolio-web`**

---

## Build

```bash
npm run build
```

Frontend output: `src/frontend/dist/`. Serve static files with any static host; point `VITE_API_BASE_URL` at your deployed API.

---

## Deploy (Vercel + API)

The app is **two parts**: a **static frontend** (good for Vercel) and an **Express API** with **MongoDB** (host on a Node-friendly platform). The Vite dev proxy does **not** exist in production — the browser calls your API using **`VITE_API_BASE_URL`**.

### 1. MongoDB Atlas (database)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow your IP (or `0.0.0.0/0` for testing).
3. Copy the **connection string** (SRV), e.g. `mongodb+srv://USER:PASS@cluster.../portfolio?retryWrites=true&w=majority`.

### 2. Deploy the API (example: Render)

Use any host that runs **Node** 18+ continuously (Render, Railway, Fly.io, etc.).

1. New **Web Service** from this Git repo.
2. **Root directory:** `src/server`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. **Environment variables:**
   - `MONGODB_URI` — your Atlas URI  
   - `PORT` — set only if the host does not inject it (Render sets `PORT` automatically)

6. After the first deploy, **seed** the database (one-time or when you change `portfolio-seed.json`):
   - In the host’s shell, or from your machine with Atlas URI in `.env`:  
     `npm run seed` from **`src/server`** (or `npm run seed` from repo root).

7. Note the public API URL, e.g. `https://your-api.onrender.com` (no trailing slash).

**CORS:** The API already uses `cors({ origin: true })`, so your Vercel domain can call it.

### 3. Deploy the frontend on Vercel

1. Push the repo to **GitHub** (or GitLab / Bitbucket).
2. [Vercel](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel reads **`vercel.json`** at the repo root:
   - **Install:** `npm install` (workspaces)
   - **Build:** `npm run build -w @roshan/portfolio-web`
   - **Output:** `src/frontend/dist`
4. **Environment variables** (Production — required before the first successful build that talks to the API):

   | Name | Value |
   |------|--------|
   | `VITE_API_BASE_URL` | `https://your-api.onrender.com` (your real API origin, **no** trailing `/`) |

5. **Redeploy** after changing `VITE_API_BASE_URL` (Vite bakes it in at build time).

6. Open your Vercel URL — the app will request `GET {VITE_API_BASE_URL}/api/portfolio`.

### 4. Checklist

- [ ] Atlas cluster + `MONGODB_URI` on the API host  
- [ ] API live and `GET https://your-api.../api/health` returns JSON  
- [ ] `npm run seed` run so `GET .../api/portfolio` returns your data  
- [ ] `VITE_API_BASE_URL` set on Vercel and project redeployed  

### 5. Updating content after deploy

Edit **`src/server/seed/portfolio-seed.json`**, commit, then run **`npm run seed`** against **production** `MONGODB_URI` (no need to rebuild Vercel unless you change frontend code).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript, Vite 5, Tailwind CSS, Motion |
| Data | TanStack Query |
| API | Express, Mongoose, MongoDB |
