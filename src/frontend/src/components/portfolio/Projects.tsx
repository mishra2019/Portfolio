import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function Projects() {
  const { projects } = usePortfolioData();
  return (
    <Section id="projects">
      <SectionHeader
        title="Featured"
        highlight="Projects"
        subtitle="Things I have built and shipped"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <Card
            key={project.name}
            delay={i * 0.1}
            slideFrom="up"
            data-ocid={`projects.item.${i + 1}`}
            className="p-0 gap-0 group"
          >
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div className="flex items-start justify-between gap-3">
                <motion.div
                  className="pf-card-icon-tile w-11 h-11 rounded-xl font-bold text-base"
                  style={{ color: "var(--pf-accent)" }}
                  whileHover={{ rotate: [0, -4, 4, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {project.name.charAt(0)}
                </motion.div>
                {project.link ? (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-xl"
                    style={{ color: "var(--pf-accent)", background: "oklch(0.55 0.18 195 / 0.14)" }}
                    data-ocid={`projects.item.${i + 1}.link`}
                    aria-label={`Open ${project.name}`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                ) : null}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[oklch(0.45_0.15_195/0.35)] to-transparent" />

              <div>
                <h3 className="text-base font-bold font-syne mb-2" style={{ color: "var(--pf-text)" }}>
                  {project.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--pf-text-secondary)" }}>
                  {project.description}
                </p>
              </div>
            </div>

            <div
              className="px-6 py-4 mt-auto border-t flex flex-wrap gap-2"
              style={{
                borderColor: "oklch(0.28 0.06 285 / 0.5)",
                background: "linear-gradient(180deg, oklch(0.08 0.04 292 / 0.5) 0%, transparent 100%)",
              }}
            >
              {project.technologies.map((tech, ti) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + ti * 0.04, duration: 0.35 }}
                >
                  <Badge variant="blue">{tech}</Badge>
                </motion.span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
