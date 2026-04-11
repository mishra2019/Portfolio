/**
 * Full-screen loading state while portfolio data is fetched.
 * Pure CSS animation (no motion lib) to keep the initial chunk small.
 */
export function PortfolioLoader() {
  return (
    <div
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center bg-[var(--pf-deep)] text-[var(--pf-text)] px-6"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      <div className="portfolio-loader-visual" aria-hidden>
        <div className="portfolio-loader-ring" />
        <div className="portfolio-loader-ring portfolio-loader-ring--delayed" />
        <div className="portfolio-loader-core" />
      </div>
      <p className="mt-8 text-sm font-medium tracking-wide text-[var(--pf-text-muted)]">
        Loading portfolio
      </p>
    </div>
  );
}
