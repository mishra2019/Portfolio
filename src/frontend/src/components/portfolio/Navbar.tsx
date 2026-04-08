import { Mail, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { initialsFromName } from "../../utils/initials";

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const { personalInfo, codingAchievements, awards } = usePortfolioData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = useMemo(() => initialsFromName(personalInfo.name), [personalInfo.name]);
  const showAchievements = codingAchievements.length > 0 || awards.length > 0;
  const navLinks = useMemo(() => {
    const base = [
      { label: "Home", href: "#hero" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Certifications", href: "#certifications" },
    ] as const;
    if (showAchievements) {
      return [...base, { label: "Achievements", href: "#achievements" as const }];
    }
    return [...base];
  }, [showAchievements]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <header className="sticky top-0 z-50 navbar-root">
      <div className="navbar-accent-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="navbar-logo-box">
              <span className="text-xs font-black tracking-widest text-white">{initials}</span>
            </div>
            <div>
              <p className="text-sm font-bold leading-none font-syne" style={{ color: "var(--pf-text)" }}>
                {personalInfo.name}
              </p>
              <p className="text-[10px] font-medium" style={{ color: "var(--pf-accent)" }}>
                {personalInfo.title}
              </p>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link, i) => (
              <motion.button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="nav-link px-3 py-2 rounded-lg cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex"
          >
            <a href={`mailto:${personalInfo.email}`} className="navbar-cta-btn">
              <Mail className="w-3.5 h-3.5" />
              GET IN TOUCH
            </a>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--pf-text-secondary)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t overflow-hidden"
            style={{
              background: "oklch(0.08 0.045 292 / 0.98)",
              borderColor: "oklch(0.3 0.07 285 / 0.55)",
            }}
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
                  style={{ color: "var(--pf-text-secondary)" }}
                >
                  {link.label}
                </button>
              ))}
              <a href={`mailto:${personalInfo.email}`} className="mt-3 navbar-cta-btn w-fit">
                <Mail className="w-3.5 h-3.5" />
                GET IN TOUCH
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
