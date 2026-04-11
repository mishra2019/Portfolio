import { Suspense, lazy } from "react";
import { Footer } from "./components/portfolio/Footer";
import { Hero } from "./components/portfolio/Hero";
import { Navbar } from "./components/portfolio/Navbar";

const BelowFold = lazy(async () => {
  const m = await import("./components/portfolio/BelowFold");
  return { default: m.BelowFold };
});

function BelowFoldFallback() {
  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 space-y-10"
      aria-hidden
    >
      <div className="h-9 w-40 rounded-lg bg-oklch(0.16 0.04 285 / 0.9) animate-pulse" />
      <div className="h-36 rounded-2xl bg-oklch(0.12 0.045 290 / 0.85) animate-pulse" />
      <div className="h-48 rounded-2xl bg-oklch(0.12 0.045 290 / 0.85) animate-pulse" />
      <div className="h-40 rounded-2xl bg-oklch(0.12 0.045 290 / 0.85) animate-pulse" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen relative z-[1]">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<BelowFoldFallback />}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
