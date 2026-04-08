import { motion } from "motion/react";
import { usePortfolioData } from "../../hooks/PortfolioProvider";

export function Summary() {
  const { profileSummary } = usePortfolioData();
  return (
    <section id="summary" className="py-12 px-4 sm:px-6 lg:px-10 section-alt">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-heading mb-5">
            Profile <span>Summary</span>
          </h2>

          <div className="summary-display-static">
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--pf-text-secondary)" }}>
              {profileSummary}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
