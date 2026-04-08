# Portfolio app (MERN)

React 19 + Vite frontend and Express + MongoDB API. Install from the **repo root** with npm workspaces.

## Run in Replit

Requires MongoDB (e.g. Replit Database or an external URI in `src/server/.env`).

```bash
npm install
cp src/server/.env.example src/server/.env   # set MONGODB_URI
npm run dev
```

- UI: port **5000** (Vite)  
- API: port **3001**

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output: `src/frontend/dist/`.
