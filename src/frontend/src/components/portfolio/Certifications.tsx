import { Award, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function Certifications() {
  const { certifications, education } = usePortfolioData();
  return (
    <Section id="certifications" className="section-alt">
      <SectionHeader
        title="Certifications &"
        highlight="Education"
        subtitle="Credentials and academic background"
      />

      {certifications.length > 0 && (
        <div className="mb-12">
          <p className="sub-section-label mb-5">Certifications</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {certifications.map((cert, i) => (
              <Card
                key={cert.name}
                delay={i * 0.08}
                slideFrom="up"
                data-ocid={`certifications.item.${i + 1}`}
                className="p-0 gap-0"
              >
                <div className="p-5 flex flex-col gap-4 h-full">
                  <motion.div
                    className="pf-card-icon-tile w-10 h-10 rounded-xl shrink-0"
                    initial={{ scale: 0.85, rotate: -8 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.05 }}
                  >
                    <Award className="w-4 h-4" style={{ color: "var(--pf-accent)" }} />
                  </motion.div>
                  <div className="flex-1 flex flex-col gap-2 min-h-0">
                    <h4 className="text-sm font-bold leading-snug font-syne" style={{ color: "var(--pf-text)" }}>
                      {cert.name}
                    </h4>
                    <p className="text-xs font-semibold" style={{ color: "var(--pf-accent)" }}>
                      {cert.issuer}
                    </p>
                    <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--pf-text-muted)" }}>
                      {cert.description}
                    </p>
                  </div>
                  {cert.date ? (
                    <div className="pt-2 border-t border-[oklch(0.28_0.06_285/0.45)]">
                      <Badge variant="muted" className="self-start">
                        {cert.date}
                      </Badge>
                    </div>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="sub-section-label mb-5">Education</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {education.map((edu, i) => (
            <Card
              key={edu.degree}
              delay={i * 0.1}
              slideFrom="right"
              data-ocid={`education.item.${i + 1}`}
              className="p-0 gap-0"
            >
              <div className="p-5 flex gap-4">
                <motion.div
                  className="pf-card-icon-tile w-12 h-12 rounded-xl flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: "var(--pf-accent)" }} />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold mb-1 font-syne" style={{ color: "var(--pf-text)" }}>
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-medium mb-3" style={{ color: "var(--pf-accent)" }}>
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="muted">
                      {edu.startYear} — {edu.endYear}
                    </Badge>
                    {edu.cgpa ? <Badge variant="ghost">GPA: {edu.cgpa}</Badge> : null}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
