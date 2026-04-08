import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import { SiLeetcode } from "react-icons/si";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { initialsFromName } from "../../utils/initials";

const STATS = [
  {
    value: "~3 yrs",
    label: "Experience",
    bg: "oklch(0.55 0.2 195 / 0.1)",
    border: "oklch(0.62 0.2 195 / 0.45)",
    color: "oklch(0.82 0.16 195)",
    glow: "oklch(0.55 0.22 195 / 0.4)",
  },
  {
    value: "10K+",
    label: "Users (payments)",
    bg: "oklch(0.48 0.14 165 / 0.12)",
    border: "oklch(0.55 0.15 165 / 0.45)",
    color: "oklch(0.85 0.13 165)",
    glow: "oklch(0.5 0.14 165 / 0.35)",
  },
  {
    value: "2",
    label: "Major projects",
    bg: "oklch(0.55 0.12 72 / 0.12)",
    border: "oklch(0.72 0.14 72 / 0.5)",
    color: "oklch(0.92 0.12 72)",
    glow: "oklch(0.65 0.14 72 / 0.35)",
  },
] as const;

function externalHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  if (roles.length === 0) return null;

  return (
    <div className="relative h-8 sm:h-9 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute text-lg sm:text-xl font-semibold gradient-text whitespace-nowrap"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function scrollToFooter() {
  document.querySelector("#footer")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { personalInfo, heroRoles } = usePortfolioData();
  const initials = useMemo(() => initialsFromName(personalInfo.name), [personalInfo.name]);
  const contactItems = useMemo(() => {
    const items: {
      icon: ComponentType<{ className?: string }>;
      text: string;
      href?: string;
      external: boolean;
    }[] = [
      { icon: Mail, text: personalInfo.email, href: `mailto:${personalInfo.email}`, external: false },
      { icon: Phone, text: personalInfo.phone, href: undefined, external: false },
      { icon: MapPin, text: personalInfo.location, href: undefined, external: false },
    ];
    if (personalInfo.linkedin.trim()) {
      items.push({
        icon: Linkedin,
        text: "LinkedIn",
        href: externalHref(personalInfo.linkedin),
        external: true,
      });
    }
    if (personalInfo.github.trim()) {
      items.push({
        icon: Github,
        text: "GitHub",
        href: externalHref(personalInfo.github),
        external: true,
      });
    }
    const lc = (personalInfo.leetcode ?? "").trim();
    if (lc) {
      items.push({
        icon: SiLeetcode,
        text: "LeetCode",
        href: externalHref(lc),
        external: true,
      });
    }
    return items;
  }, [personalInfo]);

  return (
    <>
      <section
        id="hero"
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="hero-orb-1" />
          <div className="hero-orb-2" />
          <div className="hero-orb-3" />
          <div className="hero-grid-dots" />
          <div className="hero-scanlines" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-7">
            {/* Status badges */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <span className="hero-badge-green">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Open to opportunities
              </span>
              <span className="hero-badge-blue">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--pf-accent-2)" }} />
                SDE-1 @ MONKSPACES.AI
              </span>
            </motion.div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="avatar-ring-outer-v2" />
              <div className="avatar-ring-spin-v2" />
              <div
                className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full z-10 flex items-center justify-center"
                style={{
                  background: "linear-gradient(145deg, oklch(0.12 0.06 292) 0%, oklch(0.09 0.05 305) 100%)",
                  boxShadow:
                    "0 0 56px oklch(0.5 0.2 195 / 0.35), 0 0 100px oklch(0.45 0.18 310 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.06)",
                  border: "2px solid oklch(0.35 0.1 285 / 0.55)",
                }}
              >
                <span className="font-syne font-black text-5xl sm:text-6xl hero-name-gradient select-none">
                  {initials}
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col items-center gap-2"
            >
              <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight hero-name-gradient">
                {personalInfo.name}
              </h1>
              {/* Rotating role text */}
              <RotatingRole roles={heroRoles} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={() => window.print()}
                className="hero-btn-primary"
                data-ocid="hero.download_resume.button"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
              <button
                type="button"
                onClick={scrollToFooter}
                className="hero-btn-outline"
                data-ocid="hero.lets_connect.button"
              >
                <MessageCircle className="w-4 h-4" />
                Let's Connect
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.64 + i * 0.1 }}
                  className="stat-card-v2 flex flex-col items-center py-4 px-3 rounded-2xl"
                  style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
                >
                  <span
                    className="text-2xl sm:text-3xl font-extrabold leading-none"
                    style={{ color: stat.color, textShadow: `0 0 20px ${stat.glow}` }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-medium mt-1.5 text-center leading-tight"
                    style={{ color: "var(--pf-text-muted)" }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="contact-bar"
        data-ocid="contact_bar.panel"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 px-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const inner = (
              <span className="contact-bar-item">
                <span className="contact-bar-icon-wrap">
                  <Icon className="w-3 h-3" />
                </span>
                <span>{item.text}</span>
              </span>
            );
            return item.href ? (
              <a
                key={item.text}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel="noreferrer"
              >
                {inner}
              </a>
            ) : (
              <span key={item.text}>{inner}</span>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
