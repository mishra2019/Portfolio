import { BelowFold } from "./components/portfolio/BelowFold";
import { Footer } from "./components/portfolio/Footer";
import { Hero } from "./components/portfolio/Hero";
import { Navbar } from "./components/portfolio/Navbar";

export default function App() {
  return (
    <div className="min-h-screen relative z-[1]">
      <Navbar />
      <main>
        <Hero />
        <BelowFold />
      </main>
      <Footer />
    </div>
  );
}
