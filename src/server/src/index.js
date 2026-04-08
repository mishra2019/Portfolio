import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Portfolio } from "./models/Portfolio.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Repo root .env, then package .env (later files override if both set)
dotenv.config({ path: join(__dirname, "../../../.env") });
dotenv.config({ path: join(__dirname, "../.env") });

const PORT = Number(process.env.PORT) || 3001;
const DEFAULT_MONGODB_URI = "mongodb://127.0.0.1:27017/portfolio";
const uri = (process.env.MONGODB_URI || "").trim() || DEFAULT_MONGODB_URI;
if (!process.env.MONGODB_URI?.trim()) {
  console.warn(
    `[roshan-portfolio-api] MONGODB_URI not set; using default ${DEFAULT_MONGODB_URI}. Add src/server/.env or a root .env to override.`,
  );
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

async function ensureSeeded() {
  const count = await Portfolio.countDocuments();
  if (count > 0) return;
  const seedPath = join(__dirname, "../seed/portfolio-seed.json");
  const payload = JSON.parse(readFileSync(seedPath, "utf8"));
  await Portfolio.create({ slug: "main", ...payload });
  console.log("Inserted default portfolio from seed (empty DB).");
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/portfolio", async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({
        error: "Database not connected yet. If this persists, set MONGODB_URI on your host (Atlas SRV). Default localhost MongoDB does not exist on Render/cloud.",
      });
      return;
    }
    const doc = await Portfolio.findOne({ slug: "main" }).lean();
    if (!doc) {
      res.status(404).json({ error: "Portfolio not found. Run npm run seed in src/server." });
      return;
    }
    const { _id, __v, slug, createdAt, updatedAt, ...rest } = doc;
    res.json(rest);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load portfolio" });
  }
});

function listen() {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API listening on port ${PORT} (health: /api/health)`);
  });
}

async function connectDb() {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
  });
  await ensureSeeded();
  console.log("MongoDB connected and seed checked.");
}

listen();
connectDb().catch((err) => {
  // Do not exit — exiting causes Render 502. /api/health stays up; /api/portfolio returns 503 until DB works.
  console.error("[roshan-portfolio-api] MongoDB failed (fix MONGODB_URI in Render env):", err);
});
