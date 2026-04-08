import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
}

export function SectionHeader({ title, highlight, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <h2 className="section-heading">
        {title} <span>{highlight}</span>
      </h2>
      {subtitle && (
        <p className="text-sm mt-1" style={{ color: "var(--pf-text-muted)" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
