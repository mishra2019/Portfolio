import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

function externalHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

export function Achievements() {
  const { awards, codingAchievements, personalInfo } = usePortfolioData();
  const leetcodeUrl = (personalInfo.leetcode ?? "").trim();
  if (codingAchievements.length === 0 && awards.length === 0) {
    return null;
  }
  return (
    <Section id="achievements">
      <SectionHeader
        title="Coding"
        highlight="Achievements"
        subtitle="Competitive programming rankings and honors"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {codingAchievements.map((ach, i) => (
          <Card
            key={ach.platform}
            delay={i * 0.1}
            slideFrom="up"
            data-ocid={`achievements.item.${i + 1}`}
            className="p-0 gap-0"
          >
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <motion.span
                  className="text-3xl"
                  initial={{ scale: 0, rotate: -25 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.08 }}
                >
                  {ach.icon}
                </motion.span>
                <motion.span
                  className="text-2xl font-extrabold tabular-nums font-syne"
                  style={{ color: "var(--pf-accent)" }}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.15, duration: 0.45 }}
                >
                  {ach.rating}
                </motion.span>
              </div>
              <div>
                <h3 className="text-base font-bold font-syne" style={{ color: "var(--pf-text)" }}>
                  {ach.platform}
                </h3>
                <div className="mt-2">
                  <Badge variant="blue">{ach.rank}</Badge>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--pf-text-muted)" }}>
                {ach.detail}
              </p>
              {leetcodeUrl && /leetcode/i.test(ach.platform) ? (
                <motion.a
                  href={externalHref(leetcodeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold mt-1 w-fit rounded-lg px-2 py-1.5 -ml-2 transition-colors"
                  style={{ color: "var(--pf-accent)" }}
                  whileHover={{ x: 2 }}
                  data-ocid="achievements.leetcode.profile"
                >
                  LeetCode profile
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </motion.a>
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      <div>
        <p className="sub-section-label mb-5">Awards & Honors</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {awards.map((award, i) => (
            <Card
              key={award.title}
              delay={i * 0.1}
              slideFrom="left"
              data-ocid={`awards.item.${i + 1}`}
              className="p-0 gap-0"
            >
              <div className="p-5 flex items-center gap-4">
                <motion.span
                  className="pf-card-icon-tile w-12 h-12 text-2xl shrink-0"
                  whileHover={{ scale: 1.08, rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.45 }}
                >
                  {award.icon}
                </motion.span>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold font-syne" style={{ color: "var(--pf-text)" }}>
                    {award.title}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--pf-text-muted)" }}>
                    {award.detail}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
