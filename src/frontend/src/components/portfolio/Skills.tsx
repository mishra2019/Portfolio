import { motion } from "motion/react";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { Card } from "../ui/card";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function Skills() {
  const { skillCategories } = usePortfolioData();
  return (
    <Section id="skills" alt>
      <SectionHeader
        title="Technical"
        highlight="Skills"
        subtitle="Languages, frameworks, and platforms I use to ship production systems"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {skillCategories.map((cat, i) => (
          <Card key={cat.category} delay={i * 0.07} slideFrom="up" className="p-0 gap-0">
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <motion.span
                  className="pf-card-icon-tile w-11 h-11 text-xl shrink-0"
                  role="img"
                  aria-label={cat.category}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {cat.icon}
                </motion.span>
                <div className="min-w-0 flex-1">
                  <div className="h-px w-full max-w-[48px] rounded-full bg-[oklch(0.4_0.02_85/0.45)] mb-2" />
                  <h3 className="text-[13px] font-semibold leading-tight font-syne" style={{ color: "var(--pf-text)" }}>
                    {cat.category}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88, y: 6 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 22,
                      delay: i * 0.05 + si * 0.025,
                    }}
                    className="skill-pill"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
