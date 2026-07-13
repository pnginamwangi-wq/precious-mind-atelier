import { cn } from "@/lib/utils";

/**
 * The Academy's visual mark: a serif "PIA" monogram set inside a hairline
 * gold seal, with a small diamond glyph at the crown.
 *
 * Rendered in SVG so it scales cleanly at any size (nav chip through hero
 * medallion) and prints correctly. Colour flows from currentColor for the
 * outline, and from the `--gold` and `--champagne` design tokens for the
 * champagne fill. Never hard-code hex values here: the mark must recolour
 * with the theme.
 */
export function AcademyMark({
  className,
  title = "The Precious Intelligence Academy",
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const titleId = "pia-mark-title";
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-labelledby={decorative ? undefined : titleId}
      className={cn("h-9 w-9 text-gold", className)}
    >
      {!decorative ? <title id={titleId}>{title}</title> : null}
      <defs>
        <linearGradient id="pia-seal-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--champagne)" stopOpacity="0.16" />
          <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pia-letter-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--champagne)" />
          <stop offset="55%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-soft)" />
        </linearGradient>
      </defs>

      {/* Champagne wash inside the seal */}
      <circle cx="32" cy="32" r="29" fill="url(#pia-seal-fill)" />

      {/* Outer hairline ring, broken at the crown for the diamond glyph */}
      <path
        d="M 36.4 3.3 A 29 29 0 1 1 27.6 3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Inner hairline ring */}
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.55"
      />

      {/* Crown diamond */}
      <path
        d="M32 1.4 L34.6 4 L32 6.6 L29.4 4 Z"
        fill="url(#pia-letter-fill)"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.95"
      />

      {/* PIA monogram, serif, set as text so hinting stays crisp on retina */}
      <text
        x="32"
        y="41.5"
        textAnchor="middle"
        fontFamily='"Cormorant Garamond", "Cormorant", Georgia, serif'
        fontWeight="500"
        fontSize="22"
        letterSpacing="0.5"
        fill="url(#pia-letter-fill)"
      >
        PIA
      </text>

      {/* Fine baseline flourish */}
      <path
        d="M22 46 L42 46"
        stroke="currentColor"
        strokeWidth="0.35"
        opacity="0.5"
      />
      <circle cx="32" cy="46" r="0.55" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

/**
 * Horizontal lockup: mark on the left, two-line serif wordmark on the right.
 * Use in the header, footer, and any place the full brand belongs.
 */
export function AcademyLockup({
  className,
  markClassName,
  size = "md",
}: {
  className?: string;
  markClassName?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: { mark: "h-8 w-8", overline: "text-[9px]", title: "text-[13px]" },
    md: { mark: "h-10 w-10", overline: "text-[10px]", title: "text-[15px]" },
    lg: { mark: "h-14 w-14", overline: "text-[11px]", title: "text-[19px]" },
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <AcademyMark className={cn(dims.mark, markClassName)} />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "uppercase tracking-[0.32em] text-platinum/70",
            dims.overline,
          )}
        >
          The
        </span>
        <span
          className={cn(
            "font-display tracking-[0.02em] text-ivory",
            dims.title,
          )}
        >
          Precious Intelligence Academy
        </span>
      </span>
    </span>
  );
}
