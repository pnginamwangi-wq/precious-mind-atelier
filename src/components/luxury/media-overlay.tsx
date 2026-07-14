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

/* ---------- Grand Hall asset map (Fable 5 Batch 1 + v02) ---------- */

const GH_BASE = "/media/grandhall";

export const GRAND_HALL = {
  interiorDolly: {
    poster: `${GH_BASE}/pia-grandhall-interior-dolly-desktop-v01-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-interior-dolly-desktop-v01-mobile.webp`,
    alt: "The Grand Hall of the Academy, viewed along its monumental axis.",
  },
  interiorDollyV2: {
    poster: `${GH_BASE}/pia-grandhall-interior-dolly-desktop-v02-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-interior-dolly-desktop-v02-mobile.webp`,
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
  ambienceLoopVideo: `${GH_BASE}/pia-grandhall-ambience-loop-desktop-v01.mp4`,
  plinthStatic: {
    poster: `${GH_BASE}/pia-grandhall-plinth-static-desktop-v01-poster.webp`,
    mobile: `${GH_BASE}/pia-grandhall-plinth-static-desktop-v01-mobile.webp`,
    alt: "An empty granite plinth in the reference gallery.",
  },
} as const;

/* ---------- Atelier (Batch 2) ---------- */

const AT_BASE = "/media/atelier";

export const ATELIER = {
  benchGoldenHour: {
    poster: `${AT_BASE}/pia-atelier-workbench-rows-desktop-v01-poster.webp`,
    mobile: `${AT_BASE}/pia-atelier-workbench-rows-desktop-v01-mobile.webp`,
    alt: "The Academy's atelier at golden hour, rows of jewellers' workbenches lit by task lamps.",
  },
} as const;

/* ---------- Diamond Theatre (Batch 3) ---------- */

const DT_BASE = "/media/diamondtheatre";

export const DIAMOND_THEATRE = {
  examinationStage: {
    poster: `${DT_BASE}/pia-diamondtheatre-examination-stage-desktop-v01-poster.webp`,
    mobile: `${DT_BASE}/pia-diamondtheatre-examination-stage-desktop-v01-mobile.webp`,
    alt: "The examination stage of the Diamond Theatre, a lone loupe waiting under focused light.",
  },
} as const;

/* ---------- The Mint (Batch 4) ---------- */

const MT_BASE = "/media/mint";

export const MINT = {
  coiningPress: {
    poster: `${MT_BASE}/pia-mint-coining-press-desktop-v01-poster.webp`,
    mobile: `${MT_BASE}/pia-mint-coining-press-desktop-v01-mobile.webp`,
    alt: "A coining press in the Mint, dies aligned above a fresh planchet.",
  },
} as const;

/* ---------- The Library reading room (Batch 5) ---------- */

const LR_BASE = "/media/library";

export const LIBRARY_ROOM = {
  readingRoom: {
    poster: `${LR_BASE}/pia-library-reading-room-desktop-v01-poster.webp`,
    mobile: `${LR_BASE}/pia-library-reading-room-desktop-v01-mobile.webp`,
    alt: "The Academy's Library reading room, long tables and standing lamps beneath vaulted stacks.",
  },
} as const;

/* ---------- Legends, Hall of Honour (Batch 6) ---------- */

const LG_BASE = "/media/legends";

export const LEGENDS = {
  hallOfHonour: {
    poster: `${LG_BASE}/pia-legends-hall-of-honour-desktop-v01-poster.webp`,
    mobile: `${LG_BASE}/pia-legends-hall-of-honour-desktop-v01-mobile.webp`,
    alt: "The Hall of Honour, portraits of masters ranged along a marble colonnade.",
  },
} as const;

/* ---------- Gem Museum vitrine gallery (Batch 7) ---------- */

const GM_BASE = "/media/gemmuseum";

export const GEM_MUSEUM = {
  vitrineGallery: {
    poster: `${GM_BASE}/pia-gemmuseum-vitrine-gallery-desktop-v01-poster.webp`,
    mobile: `${GM_BASE}/pia-gemmuseum-vitrine-gallery-desktop-v01-mobile.webp`,
    alt: "The vitrine gallery of the Gem Museum, illuminated cases lining a hushed corridor.",
  },
} as const;

/* ---------- Metals bullion vault (Batch 8) ---------- */

const MV_BASE = "/media/metals";

export const METALS_VAULT = {
  bullionVault: {
    poster: `${MV_BASE}/pia-metals-bullion-vault-desktop-v01-poster.webp`,
    mobile: `${MV_BASE}/pia-metals-bullion-vault-desktop-v01-mobile.webp`,
    alt: "The bullion vault of the Institute of Precious Metals, stacked ingots receding into low light.",
  },
} as const;
