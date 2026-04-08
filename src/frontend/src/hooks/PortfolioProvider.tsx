import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import { fetchPortfolio } from "../lib/api";
import type { PortfolioPayload } from "../types/portfolio";

const PortfolioContext = createContext<PortfolioPayload | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const query = useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
    staleTime: 60_000,
  });

  if (query.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--pf-deep)] text-[var(--pf-text)]">
        <p className="text-sm opacity-80">Loading portfolio…</p>
      </div>
    );
  }

  if (query.isError || !query.data) {
    const detail =
      query.error instanceof Error ? query.error.message : query.error != null ? String(query.error) : null;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center bg-[var(--pf-deep)] text-[var(--pf-text)]">
        <p className="font-semibold">Could not load portfolio</p>
        {detail ? (
          <p className="text-sm opacity-90 max-w-lg whitespace-pre-wrap break-words font-mono text-left">{detail}</p>
        ) : null}
        <p className="text-sm opacity-70 max-w-md">
          Local dev: run <code className="text-xs">npm run dev</code> (API + Vite). Production: set{" "}
          <code className="text-xs">VITE_API_BASE_URL</code> on Vercel to your Render API origin and redeploy. Static-only:{" "}
          <code className="text-xs">VITE_STATIC_PORTFOLIO=true</code>.
        </p>
      </div>
    );
  }

  return <PortfolioContext.Provider value={query.data}>{children}</PortfolioContext.Provider>;
}

export function usePortfolioData(): PortfolioPayload {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolioData must be used within PortfolioProvider");
  }
  return ctx;
}
