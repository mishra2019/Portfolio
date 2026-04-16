import { motion, type HTMLMotionProps } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const slideOffset = {
  left: { x: -36, y: 0 },
  right: { x: 36, y: 0 },
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  none: { x: 0, y: 0 },
} as const;

export type CardSlideFrom = keyof typeof slideOffset;

export type CardProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> & {
  delay?: number;
  slideFrom?: CardSlideFrom;
};

function Card({ className, delay = 0, slideFrom = "up", children, ...props }: CardProps) {
  const off = slideOffset[slideFrom];

  return (
    <motion.div
      data-slot="card"
      initial={{ opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-32px 0px -8% 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -2,
        transition: { type: "spring", stiffness: 480, damping: 32 },
      }}
      whileTap={{ scale: 0.992 }}
      className={cn(
        "portfolio-card pf-card-shell flex flex-col gap-6 rounded-2xl py-7 shadow-none text-[var(--pf-text)] overflow-hidden will-change-transform",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("px-6", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
