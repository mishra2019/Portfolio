import { Achievements } from "./Achievements";
import { Certifications } from "./Certifications";
import { Experience } from "./Experience";
import { Notes } from "./Notes";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Summary } from "./Summary";

/** Lazy-loaded bundle: everything below the hero to speed first paint. */
export function BelowFold() {
  return (
    <>
      <Summary />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Achievements />
      <Notes />
    </>
  );
}
