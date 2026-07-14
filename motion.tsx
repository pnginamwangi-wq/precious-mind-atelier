import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { luxury } from "./tokens";

/* Motion variants */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: luxury.ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: luxury.ease } },
};

export const stagger = (delay = 0.12): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});

/* Section wrapper with reveal on scroll */

type SectionProps = HTMLMotionProps<"section"> & {
  bordered?: boolean;
  tinted?: boolean;
  children: ReactNode;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { className, bordered, tinted, children, ...rest },
  ref,
) {
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger()}
      className={cn(
        "relative",
        luxury.sectionY,
        bordered && "border-y border-white/5",
        tinted && "bg-charcoal/40",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.section>
  );
});

/* Reveal item, pairs with Section stagger */

type RevealProps = HTMLMotionProps<"div"> & { children: ReactNode };

export function Reveal({ className, children, ...rest }: RevealProps) {
  return (
    <motion.div data-testid="reveal" variants={fadeUp} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

/* Editorial section header */

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className={cn("mb-16 md:mb-20", align === "center" && "text-center")}>
      <Reveal>
        <span className={luxury.eyebrow}>
          {index ? `${index}. ` : ""}
          {eyebrow}
        </span>
      </Reveal>
      <Reveal>
        <Heading className="mt-6 font-display text-5xl leading-tight md:text-7xl">{title}</Heading>
      </Reveal>
      {intro ? (
        <Reveal>
          <p
            className={cn(
              "mt-6 max-w-2xl",
              luxury.bodyMuted,
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
