import type { PortfolioPayload } from "../types/portfolio";

function portfolioUrl(): string {
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";
  return base ? `${base}/api/portfolio` : "/api/portfolio";
}

export async function fetchPortfolio(): Promise<PortfolioPayload> {
  if (import.meta.env.VITE_STATIC_PORTFOLIO === "true") {
    const { default: data } = await import("@portfolio-seed");
    return data as PortfolioPayload;
  }

  const res = await fetch(portfolioUrl());
  if (!res.ok) {
    throw new Error(`Portfolio API returned ${res.status}`);
  }
  return res.json() as Promise<PortfolioPayload>;
}
