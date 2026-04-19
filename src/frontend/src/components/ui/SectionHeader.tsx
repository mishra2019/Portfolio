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
      className="section-header-wrap mb-12 md:mb-14 max-w-3xl"
    >
      <h2 className="section-heading">
        {title} <span>{highlight}</span>
      </h2>
      {subtitle && (
        <p className="section-header-subtitle mt-3 leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
