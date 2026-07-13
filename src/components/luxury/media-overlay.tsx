import { cn } from "@/lib/utils";

/**
 * MediaOverlay
 *
 * Renders a poster image with a mobile-optimised 9:16 crop for small
 * viewports, plus an optional dark scrim so foreground copy stays legible.
 * Video loops are an optional upgrade layered on top in the future; the
 * poster is always the baseline (matches the Fable 5 asset registry).
 */

export type ScrimVariant = "scrim-hero" | "scrim-card" | "none";

export interface MediaOverlayProps {
  /** Desktop poster (16:9 or wider), WebP recommended. */
  poster: string;
  /** Mobile 9:16 centre crop. Falls back to poster when omitted. */
  mobile?: string;
  /** Alt text. Leave empty ("") for decorative backgrounds. */
  alt?: string;
  /** Loading priority. Hero placements use "eager", backgrounds "lazy". */
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "auto" | "low";
  /** Scrim overlay preset. */
  scrim?: ScrimVariant;
  className?: string;
  /** When true, the image is treated as decorative (aria-hidden). */
  decorative?: boolean;
}

const SCRIM_CLASSES: Record<ScrimVariant, string> = {
  "scrim-hero": "scrim-hero",
  "scrim-card": "scrim-card",
  none: "",
};

export function MediaOverlay({
  poster,
  mobile,
  alt = "",
  loading = "lazy",
  fetchPriority,
  scrim = "none",
  className,
  decorative,
}: MediaOverlayProps) {
  const isDecorative = decorative ?? alt === "";
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <picture>
        {mobile ? (
          <source media="(max-width: 640px)" srcSet={mobile} type="image/webp" />
        ) : null}
        <img
          src={poster}
          alt={isDecorative ? "" : alt}
          aria-hidden={isDecorative || undefined}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          width={2752}
          height={1536}
          className="h-full w-full object-cover"
        />
      </picture>
      {scrim !== "none" ? (
        <div aria-hidden className={cn("absolute inset-0", SCRIM_CLASSES[scrim])} />
      ) : null}
    </div>
  );
}

/* ---------- Grand Hall asset map (Fable 5 Batch 1) ---------- */

const GH_BASE = "/media/grandhall";

export const GRAND_HALL = {
  interiorDolly: {
    poster: `${GH_BASE}/pia-grandhall-interior-dolly-desktop-v01-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-interior-dolly-desktop-v01-mobile.webp`,
    alt: "The Grand Hall of the Academy, viewed along its monumental axis.",
  },
  exteriorApproach: {
    poster: `${GH_BASE}/pia-grandhall-exterior-approach-desktop-v01-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-exterior-approach-desktop-v01-mobile.webp`,
    alt: "Approaching the Academy at sunrise.",
  },
  campusModelOrbit: {
    poster: `${GH_BASE}/pia-grandhall-campus-model-orbit-desktop-v01-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-campus-model-orbit-desktop-v01-mobile.webp`,
    alt: "An architectural model of the Academy campus on a black stone plinth.",
  },
  ambienceLoop: {
    poster: `${GH_BASE}/pia-grandhall-ambience-loop-desktop-v01-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-ambience-loop-desktop-v01-mobile.webp`,
    alt: "Sunlight and dust in the Grand Hall skylight.",
  },
  plinthStatic: {
    poster: `${GH_BASE}/pia-grandhall-plinth-static-desktop-v01-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-plinth-static-desktop-v01-mobile.webp`,
    alt: "An empty granite plinth in the reference gallery.",
  },
} as const;
