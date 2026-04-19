import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

export function Section({ id, children, className = "", alt = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`portfolio-section py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 ${alt ? "section-alt" : ""} ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
