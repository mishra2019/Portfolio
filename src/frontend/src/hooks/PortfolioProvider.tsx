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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 px-4 text-center bg-[var(--pf-deep)] text-[var(--pf-text)]">
        <p className="font-semibold">Could not load portfolio</p>
        <p className="text-sm opacity-70 max-w-md">
          For local dev: start the API (MongoDB + Express) so Vite can proxy <code className="text-xs">/api</code>, or set{" "}
          <code className="text-xs">VITE_API_BASE_URL</code>. For a static deploy (e.g. Vercel only), set{" "}
          <code className="text-xs">VITE_STATIC_PORTFOLIO=true</code> at build time.
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
