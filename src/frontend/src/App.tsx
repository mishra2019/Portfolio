import { Achievements } from "./components/portfolio/Achievements";
import { Certifications } from "./components/portfolio/Certifications";
import { Experience } from "./components/portfolio/Experience";
import { Footer } from "./components/portfolio/Footer";
import { Hero } from "./components/portfolio/Hero";
import { Navbar } from "./components/portfolio/Navbar";
import { Notes } from "./components/portfolio/Notes";
import { Projects } from "./components/portfolio/Projects";
import { Skills } from "./components/portfolio/Skills";
import { Summary } from "./components/portfolio/Summary";

export default function App() {
  return (
    <div className="min-h-screen relative z-[1]">
      <Navbar />
      <main>
        <Hero />
        <Summary />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Achievements />
        <Notes />
      </main>
      <Footer />
    </div>
  );
}
