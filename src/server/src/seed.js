import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Portfolio } from "./models/Portfolio.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: join(__dirname, "../../../.env") });
dotenv.config({ path: join(__dirname, "../.env") });

const DEFAULT_MONGODB_URI = "mongodb://127.0.0.1:27017/portfolio";
const uri = (process.env.MONGODB_URI || "").trim() || DEFAULT_MONGODB_URI;
if (!process.env.MONGODB_URI?.trim()) {
  console.warn(`[roshan-portfolio seed] MONGODB_URI not set; using default ${DEFAULT_MONGODB_URI}`);
}

const seedPath = join(__dirname, "../seed/portfolio-seed.json");
const payload = JSON.parse(readFileSync(seedPath, "utf8"));

await mongoose.connect(uri);
await Portfolio.deleteMany({ slug: "main" });
await Portfolio.create({ slug: "main", ...payload });
console.log("Seeded portfolio document (slug: main).");
await mongoose.disconnect();
