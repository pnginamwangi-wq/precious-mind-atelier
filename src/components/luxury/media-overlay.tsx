import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * MediaOverlay
 *
 * Cinematic backdrop primitive. Renders a poster image with an optional
 * mobile 9:16 crop, an optional dark scrim, an optional slow Ken Burns
 * zoom for immersion, and an optional muted video loop that fades in on
 * top of the poster once it can play through. Respects prefers-reduced-motion.
 */

export type ScrimVariant = "scrim-hero" | "scrim-card" | "none";

export interface MediaOverlayProps {
  /** Desktop poster (16:9 or wider), WebP/JPG. */
  poster: string;
  /** Mobile 9:16 centre crop. Falls back to poster when omitted. */
  mobile?: string;
  /** Optional looping video (webm/mp4). Muted, autoplay, playsInline. */
  video?: string;
  /** Alt text. Leave empty ("") for decorative backgrounds. */
  alt?: string;
  /** Loading priority. Hero placements use "eager", backgrounds "lazy". */
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "auto" | "low";
  /** Scrim overlay preset. */
  scrim?: ScrimVariant;
  /** Slow Ken Burns zoom for stills. Disabled by reduced motion. */
  kenBurns?: boolean;
  className?: string;
  /** When true, the image is treated as decorative (aria-hidden). */
  decorative?: boolean;
}

const SCRIM_CLASSES: Record<ScrimVariant, string> = {
  "scrim-hero": "scrim-hero",
  "scrim-card": "scrim-card",
  none: "",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function MediaOverlay({
  poster,
  mobile,
  video,
  alt = "",
  loading = "lazy",
  fetchPriority,
  scrim = "none",
  kenBurns = false,
  className,
  decorative,
}: MediaOverlayProps) {
  const isDecorative = decorative ?? alt === "";
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!video || reduced) return;
    const el = videoRef.current;
    if (!el) return;
    const onReady = () => setVideoReady(true);
    el.addEventListener("canplaythrough", onReady, { once: true });
    return () => el.removeEventListener("canplaythrough", onReady);
  }, [video, reduced]);

  const zoom = kenBurns && !reduced;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <picture>
        {mobile ? (
          <source media="(max-width: 640px)" srcSet={mobile} />
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
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700",
            zoom && "animate-ken-burns will-change-transform",
            videoReady && "opacity-0",
          )}
        />
      </picture>
      {video && !reduced ? (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            videoReady ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
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

/* ---------- Atelier asset map (Batch 2, in progress) ---------- */

export const ATELIER = {
  benchGoldenHour: {
    poster: "/__l5e/assets-v1/53c528ea-4b15-4e56-b02e-bf14c452ab80/pia-atelier-bench-desktop-v01.jpg",
    alt: "A jeweller's workbench at golden hour, brass tools and a set diamond ring under a task lamp.",
  },
} as const;
