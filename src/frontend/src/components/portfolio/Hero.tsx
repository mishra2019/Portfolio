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
import { useEffect, useMemo, useState, useCallback } from "react";
import type { ComponentType } from "react";
import { SiLeetcode } from "react-icons/si";
import { usePortfolioData } from "../../hooks/PortfolioProvider";
import { initialsFromName } from "../../utils/initials";

const STATS = [
  {
    value: "~3 yrs",
    label: "Experience",
    bg: "oklch(0.22 0.06 252 / 0.22)",
    border: "oklch(0.48 0.1 252 / 0.45)",
    color: "oklch(0.92 0.11 252)",
    glow: "0 0 28px oklch(0.5 0.14 252 / 0.35)",
  },
  {
    value: "10K+",
    label: "Users (payments)",
    bg: "oklch(0.2 0.06 165 / 0.2)",
    border: "oklch(0.42 0.1 165 / 0.42)",
    color: "oklch(0.9 0.12 165)",
    glow: "0 0 26px oklch(0.45 0.12 165 / 0.3)",
  },
  {
    value: "2",
    label: "Major projects",
    bg: "oklch(0.22 0.06 75 / 0.18)",
    border: "oklch(0.48 0.1 75 / 0.4)",
    color: "oklch(0.95 0.12 85)",
    glow: "0 0 24px oklch(0.55 0.1 75 / 0.22)",
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
    <div className="relative h-8 min-[400px]:h-9 sm:h-10 flex items-center justify-center overflow-hidden w-full max-w-[min(100%,22rem)] min-[400px]:max-w-none px-2">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute px-1 text-center text-base min-[400px]:text-lg sm:text-xl hero-role-shimmer whitespace-normal sm:whitespace-nowrap leading-snug max-w-full"
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

type ContactBarItemData = {
  icon: ComponentType<{ className?: string }>;
  text: string;
  href?: string;
  external: boolean;
};

function ContactBarRow({ item }: { item: ContactBarItemData }) {
  const Icon = item.icon;
  return (
    <span className="contact-bar-item min-w-0 max-w-[min(100%,20rem)] sm:max-w-none">
      <span className="contact-bar-icon-wrap shrink-0">
        <Icon className="w-3 h-3" />
      </span>
      <span className="min-w-0 break-words text-left sm:text-center">
        {item.text}
      </span>
    </span>
  );
}

export function Hero() {
  const { personalInfo, heroRoles } = usePortfolioData();
  const resumeHref =
    (personalInfo.resumePdf ?? "").trim() || "/Roshan_mishra.pdf";
  const profilePhotoSrc =
    (personalInfo.profilePhoto ?? "").trim() || "/profile-photo.png";
  const initials = useMemo(
    () => initialsFromName(personalInfo.name),
    [personalInfo.name],
  );
  const [photoFailed, setPhotoFailed] = useState(false);
  const onPhotoError = useCallback(() => setPhotoFailed(true), []);
  const contactItems = useMemo(() => {
    const items: ContactBarItemData[] = [
      {
        icon: Mail,
        text: personalInfo.email,
        href: `mailto:${personalInfo.email}`,
        external: false,
      },
      {
        icon: Phone,
        text: personalInfo.phone,
        href: undefined,
        external: false,
      },
      {
        icon: MapPin,
        text: personalInfo.location,
        href: undefined,
        external: false,
      },
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
        className="relative w-full pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-16 sm:pt-28 sm:pb-24 md:pt-32 md:pb-28 lg:pb-32 px-3 min-[400px]:px-4 sm:px-6 lg:px-10 overflow-hidden"
      >
        {/* Subtle backdrop — calm, editorial (not decorative “game HUD”) */}
        <div className="absolute inset-0 pointer-events-none hero-backdrop" aria-hidden />

        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
            {/* Status badges */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full"
            >
              <span className="hero-badge-green max-w-[calc(100vw-2rem)] sm:max-w-none">
                <span className="inline-flex rounded-full h-1.5 w-1.5 shrink-0 bg-emerald-500/90" />
                Open to opportunities
              </span>
              <span className="hero-badge-blue max-w-[calc(100vw-2rem)] sm:max-w-none">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--pf-accent)]"
                />
                <span className="text-left leading-tight">
                  SDE-1 @ MONKSPACES.AI
                </span>
              </span>
            </motion.div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="hero-avatar-frame z-10">
                <div className="hero-avatar-frame-corners" aria-hidden />
                <div className="hero-avatar-plate">
                  <div className="hero-avatar-photo-inner">
                    {!photoFailed ? (
                      <img
                        src={profilePhotoSrc}
                        alt={`${personalInfo.name}, professional headshot`}
                        width={416}
                        height={416}
                        decoding="async"
                        className="hero-avatar-photo"
                        onError={onPhotoError}
                      />
                    ) : (
                      <div className="flex min-h-full w-full items-center justify-center rounded-full bg-[oklch(0.16_0.01_85)]">
                        <span className="font-syne font-bold text-4xl min-[400px]:text-5xl sm:text-6xl md:text-6xl hero-headline-gradient select-none">
                          {initials}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col items-center gap-2 w-full px-1"
            >
              <h1 className="font-syne text-[clamp(1.65rem,5.5vw+0.4rem,4.5rem)] sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight hero-headline-gradient break-words max-w-full">
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
              className="flex flex-col w-full max-w-md sm:max-w-none sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3"
            >
              <a
                href={resumeHref}
                download="Roshan_mishra.pdf"
                className="hero-btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                data-ocid="hero.download_resume.button"
              >
                <Download className="w-4 h-4 shrink-0" />
                Download Resume
              </a>
              <button
                type="button"
                onClick={scrollToFooter}
                className="hero-btn-outline w-full sm:w-auto inline-flex items-center justify-center"
                data-ocid="hero.lets_connect.button"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                Let's Connect
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.64 + i * 0.1 }}
                  className="stat-card-v2 flex flex-col items-center py-3.5 min-[400px]:py-4 px-4 min-[400px]:px-3 rounded-2xl"
                  style={{
                    background: stat.bg,
                    border: `1px solid ${stat.border}`,
                  }}
                >
                  <span
                    className="text-2xl min-[400px]:text-3xl font-bold leading-none tabular-nums"
                    style={{
                      color: stat.color,
                      textShadow: stat.glow,
                    }}
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
        <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5 px-3 sm:px-4 md:px-6 lg:px-10">
          {contactItems.map((item) =>
            item.href ? (
              <a
                key={item.text}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel="noreferrer"
              >
                <ContactBarRow item={item} />
              </a>
            ) : (
              <span key={item.text}>
                <ContactBarRow item={item} />
              </span>
            ),
          )}
        </div>
      </motion.div>
    </>
  );
}
