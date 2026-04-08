/// <reference types="vite/client" />

declare module "@portfolio-seed" {
  const value: import("./types/portfolio").PortfolioPayload;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  /** When `"true"`, portfolio data is read from bundled `src/server/seed/portfolio-seed.json` (no API / MongoDB). */
  readonly VITE_STATIC_PORTFOLIO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
