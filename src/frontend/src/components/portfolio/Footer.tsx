import { Code2, Github, Heart, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import type { ComponentType } from "react";
import { SiLeetcode } from "react-icons/si";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { initialsFromName } from "../../utils/initials";

function externalHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

export function Footer() {
  const { personalInfo, profileSummary, codingAchievements, awards } = usePortfolioData();
  const initials = useMemo(() => initialsFromName(personalInfo.name), [personalInfo.name]);
  const profilePhotoSrc =
    (personalInfo.profilePhoto ?? "").trim() || "/profile-photo.png";
  const [photoFailed, setPhotoFailed] = useState(false);
  const onPhotoError = useCallback(() => setPhotoFailed(true), []);
  const footerBio = useMemo(() => {
    const t = profileSummary.trim();
    if (t.length <= 220) return t;
    return `${t.slice(0, 217).trim()}…`;
  }, [profileSummary]);
  const showAchievements = codingAchievements.length > 0 || awards.length > 0;

  const navSections = useMemo(() => {
    const portfolioLinks: { text: string; href: string }[] = [
      { text: "Home", href: "#hero" },
      { text: "Skills", href: "#skills" },
      { text: "Experience", href: "#experience" },
      { text: "Projects", href: "#projects" },
      { text: "Certifications", href: "#certifications" },
    ];
    if (showAchievements) portfolioLinks.push({ text: "Achievements", href: "#achievements" });

    const connectLinks: { text: string; href: string }[] = [
      { text: "Email Me", href: `mailto:${personalInfo.email}` },
    ];
    if (personalInfo.linkedin.trim()) {
      connectLinks.push({ text: "LinkedIn", href: externalHref(personalInfo.linkedin) });
    }
    if (personalInfo.github.trim()) {
      connectLinks.push({ text: "GitHub", href: externalHref(personalInfo.github) });
    }
    const lc = (personalInfo.leetcode ?? "").trim();
    if (lc) {
      connectLinks.push({ text: "LeetCode", href: externalHref(lc) });
    }
    connectLinks.push({ text: "Notes", href: "#notes" }, { text: "Summary", href: "#summary" });

    return [
      { label: "Portfolio", links: portfolioLinks },
      { label: "Connect", links: connectLinks },
    ];
  }, [personalInfo, showAchievements]);

  const contactDetails = useMemo(
    () => [
      { icon: Mail, text: personalInfo.email, href: `mailto:${personalInfo.email}` },
      { icon: Phone, text: personalInfo.phone, href: undefined as string | undefined },
      { icon: MapPin, text: personalInfo.location, href: undefined as string | undefined },
    ],
    [personalInfo],
  );

  const social = useMemo(() => {
    const items: { icon: ComponentType<{ className?: string }>; href: string; label: string }[] = [];
    if (personalInfo.linkedin.trim()) {
      items.push({ icon: Linkedin, href: externalHref(personalInfo.linkedin), label: "LinkedIn" });
    }
    if (personalInfo.github.trim()) {
      items.push({ icon: Github, href: externalHref(personalInfo.github), label: "GitHub" });
    }
    const lc = (personalInfo.leetcode ?? "").trim();
    if (lc) {
      items.push({ icon: SiLeetcode, href: externalHref(lc), label: "LeetCode" });
    }
    items.push({ icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" });
    return items;
  }, [personalInfo]);

  return (
    <footer id="footer" className="relative overflow-hidden">
      {/* top glow bar */}
      <div className="footer-top-glow" />

      {/* main body */}
      <div className="footer-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* ── upper grid ── */}
          <div className="footer-grid">
            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="footer-brand-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="footer-avatar">
                  {!photoFailed ? (
                    <img
                      src={profilePhotoSrc}
                      alt=""
                      width={104}
                      height={104}
                      decoding="async"
                      onError={onPhotoError}
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <div>
                  <p className="text-lg font-bold leading-tight font-syne" style={{ color: "var(--pf-text)" }}>
                    {personalInfo.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--pf-text-muted)" }}>
                    {personalInfo.title}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "var(--pf-text-secondary)" }}>
                {footerBio}
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {social.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="footer-social-icon"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Nav columns */}
            {navSections.map((section, si) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + si * 0.1 }}
              >
                <p className="footer-nav-heading">{section.label}</p>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      <a href={link.href} className="footer-nav-link">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="footer-nav-heading">Get in Touch</p>
              <ul className="space-y-4">
                {contactDetails.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <div className="flex items-start gap-3">
                      <span className="footer-contact-icon-wrap">
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-sm break-all" style={{ color: "var(--pf-text-secondary)" }}>
                        {c.text}
                      </span>
                    </div>
                  );
                  return (
                    <li key={c.text}>
                      {c.href ? (
                        <a href={c.href} className="hover:opacity-80 transition-opacity">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Availability badge */}
              <div className="footer-availability mt-6">
                <span className="inline-flex rounded-full h-2 w-2 shrink-0 bg-emerald-600/90" />
                <span className="text-xs font-medium" style={{ color: "var(--pf-text-secondary)" }}>
                  Open to new opportunities
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── divider ── */}
          <div className="footer-divider" />

          {/* ── bottom bar ── */}
          <div className="footer-bottom">
            <p className="text-xs" style={{ color: "var(--pf-text-muted)" }}>
              © {new Date().getFullYear()} {personalInfo.name} — All rights reserved
            </p>
            <p className="text-xs flex items-center gap-1" style={{ color: "var(--pf-text-muted)" }}>
              Built with <Heart className="w-3 h-3 text-rose-400" /> and
              <Code2 className="w-3 h-3" style={{ color: "var(--pf-accent)" }} />
              React + Vite
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
