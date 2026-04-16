import portfolioSeed from "@portfolio-seed";
import type { PortfolioPayload } from "../types/portfolio";

function portfolioUrl(): string {
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";
  return base ? `${base}/api/portfolio` : "/api/portfolio";
}

export async function fetchPortfolio(): Promise<PortfolioPayload> {
  if (import.meta.env.VITE_STATIC_PORTFOLIO === "true") {
    return portfolioSeed as PortfolioPayload;
  }

  const url = portfolioUrl();
  const controller = new AbortController();
  const timeoutMs = 60_000;
  const t = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(url, { signal: controller.signal });
  } catch (e) {
    clearTimeout(t);
    if (e instanceof Error && e.name === "AbortError") {
      throw new Error(
        `Portfolio request timed out after ${timeoutMs / 1000}s (${url}). On Render free tier the first request can take a minute—open your API /api/health in a new tab, wait for JSON, then reload. Also confirm VITE_API_BASE_URL is set on Vercel and redeploy.`,
      );
    }
    throw e;
  }
  clearTimeout(t);

  const ct = res.headers.get("content-type") || "";
  if (!res.ok) {
    const text = await res.text();
    let extra = "";
    try {
      const j = JSON.parse(text) as { error?: string };
      if (typeof j.error === "string") extra = ` — ${j.error}`;
    } catch {
      if (text.length > 0 && text.length < 240) extra = ` — ${text}`;
    }
    throw new Error(`Portfolio API returned ${res.status}${extra}`);
  }
  if (!ct.includes("application/json")) {
    throw new Error(
      `Expected JSON from ${url} but got "${ct}". If VITE_API_BASE_URL is missing on Vercel, the app calls /api on the same host and gets HTML instead—set VITE_API_BASE_URL to your Render URL and redeploy.`,
    );
  }
  return res.json() as Promise<PortfolioPayload>;
}
