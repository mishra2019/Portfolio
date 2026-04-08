import { motion } from "motion/react";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function Experience() {
  const { experiences } = usePortfolioData();
  return (
    <Section id="experience" className="section-alt">
      <SectionHeader
        title="Work"
        highlight="Experience"
        subtitle="My professional journey and key contributions"
      />

      <div className="relative">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-0.5 hidden sm:block"
          style={{
            background:
              "linear-gradient(to bottom, var(--pf-accent) 0%, oklch(0.55 0.22 312) 45%, oklch(0.28 0.06 285) 100%)",
          }}
        />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <Card
              key={`${exp.role}-${exp.company}`}
              delay={i * 0.12}
              slideFrom="left"
              data-ocid={`experience.item.${i + 1}`}
              className="sm:ml-10 p-0 gap-0 overflow-visible"
            >
              <div className="absolute -left-3 top-7 w-3.5 h-3.5 rounded-full timeline-dot hidden sm:block ring-4 ring-[oklch(0.1_0.05_292)]" />

              <div className="p-6 pb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-[oklch(0.28_0.06_285/0.45)]">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-syne tracking-tight" style={{ color: "var(--pf-text)" }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: "var(--pf-accent)" }}>
                    {exp.company}
                  </p>
                </div>
                <Badge variant="blue" className="flex-shrink-0 self-start sm:self-center">
                  {exp.startDate} — {exp.endDate ?? "Present"}
                </Badge>
              </div>

              <motion.ul
                className="flex flex-col gap-3 px-6 pb-6 pt-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
                  },
                }}
              >
                {exp.description.map((bullet) => (
                  <motion.li
                    key={bullet}
                    variants={{
                      hidden: { opacity: 0, x: -14 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3 text-sm leading-relaxed"
                    style={{ color: "var(--pf-text-secondary)" }}
                  >
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, var(--pf-accent), var(--pf-accent-2))",
                        boxShadow: "0 0 10px oklch(0.55 0.2 195 / 0.45)",
                      }}
                    />
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
