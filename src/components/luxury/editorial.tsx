import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow, Hairline, luxury } from "./tokens";
import { fadeUp } from "./motion";

/**
 * Editorial block set.
 *
 * Small, composable primitives for building luxury pages with consistent
 * typography, spacing, and motion. Pair with Section / Container / Reveal
 * from the luxury system.
 */

/* ------------------------------------------------------------------ */
/*  Caption                                                            */
/* ------------------------------------------------------------------ */

type CaptionProps = {
  index?: string;
  title: ReactNode;
  origin?: ReactNode;
  note?: ReactNode;
  href?: string;
  cta?: string;
  align?: "left" | "right";
  className?: string;
};

/**
 * Standalone caption block. Use next to any image / vignette /
 * media element to give it editorial context (N° label, title,
 * origin, optional arrow link).
 */
export function Caption({
  index,
  title,
  origin,
  note,
  href,
  cta = "Study the object",
  align = "left",
  className,
}: CaptionProps) {
  return (
    <div className={cn(align === "right" && "md:text-right", className)}>
      {index ? <Eyebrow>{`N° ${index}`}</Eyebrow> : null}
      <h3 className="mt-5 font-display text-3xl leading-tight text-ivory md:text-4xl">
        {title}
      </h3>
      {origin ? <p className={cn("mt-3", luxury.bodySmall)}>{origin}</p> : null}
      {note ? (
        <p className={cn("mt-4 max-w-md", luxury.bodyMuted, align === "right" && "md:ml-auto")}>
          {note}
        </p>
      ) : null}
      <Hairline className={cn("mt-8 w-24", align === "right" && "md:ml-auto")} />
      {href ? (
        <div className="mt-8">
          <a
            href={href}
            className="group inline-flex items-center gap-3 text-[11px] font-light uppercase tracking-[0.28em] text-ivory outline-none transition-colors hover:text-gold focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
          >
            {cta}
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Figure                                                             */
/* ------------------------------------------------------------------ */

type FigureProps = {
  src: string;
  alt: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  caption?: ReactNode;
  className?: string;
};

const aspectMap: Record<NonNullable<FigureProps["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

/**
 * Semantic <figure> with our editorial image treatment: charcoal
 * placeholder, slow zoom on hover, gradient veil, optional caption.
 */
export function Figure({ src, alt, aspect = "square", caption, className }: FigureProps) {
  return (
    <figure className={cn("group", className)}>
      <div className={cn("relative overflow-hidden bg-charcoal", aspectMap[aspect])}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />
        <div aria-hidden className="on-media pointer-events-none absolute inset-0 scrim-bottom" />
      </div>
      {caption ? (
        <figcaption className={cn("mt-4 text-[13px] font-light tracking-wide text-platinum/70")}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Vignette                                                           */
/* ------------------------------------------------------------------ */

type VignetteProps = {
  index?: string;
  image: string;
  alt: string;
  title: ReactNode;
  origin?: ReactNode;
  note?: ReactNode;
  href?: string;
  cta?: string;
  reverse?: boolean;
  aspect?: FigureProps["aspect"];
};

/**
 * Full editorial vignette: image + caption in a 12-col split.
 * The workhorse composition for object studies, faculty profiles,
 * institute highlights, journal entries.
 */
export function Vignette({
  index,
  image,
  alt,
  title,
  origin,
  note,
  href,
  cta,
  reverse,
  aspect = "square",
}: VignetteProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: luxury.ease }}
      className={cn(
        "grid items-center gap-10 md:grid-cols-12 md:gap-16",
        reverse && "md:[&>*:first-child]:order-2",
      )}
    >
      <div className="md:col-span-7">
        <Figure src={image} alt={alt} aspect={aspect} />
      </div>
      <div className="md:col-span-5">
        <Caption
          index={index}
          title={title}
          origin={origin}
          note={note}
          href={href}
          cta={cta}
          align={reverse ? "right" : "left"}
        />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  PullQuote                                                          */
/* ------------------------------------------------------------------ */

type PullQuoteProps = {
  quote: ReactNode;
  attribution?: ReactNode;
  role?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Cinematic display quote. Use as a rhythm break between prose sections
 * or to frame a chapter opening.
 */
export function PullQuote({ quote, attribution, role, align = "left", className }: PullQuoteProps) {
  return (
    <motion.blockquote
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "relative",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-8 font-display text-[120px] leading-none text-gold/25 md:-left-10 md:text-[160px]"
      >
        “
      </span>
      <p className="font-display text-3xl leading-[1.2] text-ivory md:text-4xl lg:text-5xl">
        {quote}
      </p>
      {(attribution || role) && (
        <footer className={cn("mt-8 flex items-center gap-4", align === "center" && "justify-center")}>
          <Hairline className="w-10 shrink-0" />
          <div>
            {attribution ? (
              <div className="font-numeric text-[11px] uppercase tracking-[0.28em] text-gold">
                {attribution}
              </div>
            ) : null}
            {role ? (
              <div className="mt-1 text-[12px] font-light tracking-wide text-platinum/70">
                {role}
              </div>
            ) : null}
          </div>
        </footer>
      )}
    </motion.blockquote>
  );
}

/* ------------------------------------------------------------------ */
/*  ChapterMark                                                        */
/* ------------------------------------------------------------------ */

type ChapterMarkProps = {
  index: string;
  eyebrow: string;
  title?: ReactNode;
  className?: string;
};

/**
 * Compact chapter marker for in-flow section breaks. Lighter than
 * SectionHeader, keeps rhythm when a full header would feel heavy.
 */
export function ChapterMark({ index, eyebrow, title, className }: ChapterMarkProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      <span className="font-numeric text-[11px] tracking-[0.3em] text-gold">{index}</span>
      <Hairline className="w-16" />
      <div>
        <Eyebrow muted>{eyebrow}</Eyebrow>
        {title ? (
          <div className="mt-1 font-display text-xl leading-tight text-ivory">{title}</div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Aside                                                              */
/* ------------------------------------------------------------------ */

/**
 * Bordered editorial aside for glossary terms, sidebars, footnotes.
 */
export function Aside({
  eyebrow,
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLElement> & { eyebrow?: ReactNode }) {
  return (
    <aside
      className={cn(
        "relative border-l border-gold/40 bg-charcoal/40 p-6 md:p-8",
        className,
      )}
      {...rest}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <div className={cn("mt-3", luxury.bodyMuted)}>{children}</div>
    </aside>
  );
}
