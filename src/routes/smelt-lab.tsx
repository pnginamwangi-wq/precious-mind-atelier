import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Flame, Gauge, Info, RotateCcw, SkipForward, Sparkles } from "lucide-react";

import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  Hairline,
  LuxButton,
  Section,
  SectionHeader,
  Reveal,
  KnowledgeCheck,
  luxury,
} from "@/components/luxury";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/smelt-lab")({
  head: () => ({
    meta: [
      { title: "The Smelt Lab, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "A cinematic 3D interactive that teaches karats by letting you mix your own gold alloy, melt it in a virtual crucible, and cast a bar.",
      },
      { property: "og:title", content: "The Smelt Lab, learn karats by mixing them" },
      {
        property: "og:description",
        content:
          "Pour gold, copper, silver, and palladium into a virtual crucible. Watch the karat, purity, colour, and hallmark emerge in real time.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/smelt-lab" }],
  }),
  component: SmeltLabPage,
});

/* ---------- Metals & physics ---------- */

type MetalKey = "gold" | "copper" | "silver" | "palladium";

type Metal = {
  key: MetalKey;
  label: string;
  short: string;
  meltC: number;
  color: [number, number, number]; // rgb solid
  molten: [number, number, number]; // rgb molten glow
  note: string;
};

const METALS: readonly Metal[] = [
  {
    key: "gold",
    label: "24K Pure Gold",
    short: "Au",
    meltC: 1064,
    color: [222, 178, 74],
    molten: [255, 210, 120],
    note: "The only metal that counts toward the karat number.",
  },
  {
    key: "copper",
    label: "Copper",
    short: "Cu",
    meltC: 1085,
    color: [184, 115, 51],
    molten: [255, 150, 90],
    note: "Adds strength and warmth, pushes the alloy toward rose.",
  },
  {
    key: "silver",
    label: "Fine Silver",
    short: "Ag",
    meltC: 962,
    color: [214, 218, 224],
    molten: [235, 235, 240],
    note: "Cools the tone, balances the alloy toward classic yellow.",
  },
  {
    key: "palladium",
    label: "Palladium",
    short: "Pd",
    meltC: 1555,
    color: [200, 202, 208],
    molten: [220, 222, 230],
    note: "Bleaches colour out entirely, the classic white gold recipe.",
  },
] as const;

const BAR_SIZES = [1, 2.5, 5, 10, 20, 31.1, 50, 100] as const;
const MAX_PER_METAL = 60;
const STEP = 0.5;

type Mix = Record<MetalKey, number>;

const ZERO_MIX: Mix = { gold: 0, copper: 0, silver: 0, palladium: 0 };

type Preset = { name: string; hint: string; mix: Mix };

const PRESETS: readonly Preset[] = [
  { name: "24K Pure", hint: "999 investment", mix: { gold: 10, copper: 0, silver: 0, palladium: 0 } },
  { name: "22K Yellow", hint: "916, MENA / South Asia", mix: { gold: 9.16, copper: 0.5, silver: 0.34, palladium: 0 } },
  { name: "18K Yellow", hint: "750, fine jewellery", mix: { gold: 7.5, copper: 1.25, silver: 1.25, palladium: 0 } },
  { name: "18K Rose", hint: "750, warm pink", mix: { gold: 7.5, copper: 2.25, silver: 0.25, palladium: 0 } },
  { name: "18K White", hint: "750, palladium white", mix: { gold: 7.5, copper: 0, silver: 1.0, palladium: 1.5 } },
  { name: "14K Yellow", hint: "585, US retail", mix: { gold: 5.85, copper: 2.1, silver: 2.05, palladium: 0 } },
  { name: "10K Yellow", hint: "417, US minimum", mix: { gold: 4.17, copper: 3.0, silver: 2.83, palladium: 0 } },
  { name: "9K Yellow", hint: "375, UK / EU entry", mix: { gold: 3.75, copper: 3.2, silver: 3.05, palladium: 0 } },
];

type Challenge = { title: string; brief: string; target: { karat: number; colour: ColourName; weight: number } };

type ColourName = "Pure Gold" | "Yellow Gold" | "Rose Gold" | "White Gold" | "Green-Tinted Gold";

const CHALLENGES: readonly Challenge[] = [
  { title: "The wedding band", brief: "Cast a clean 10 g bar of 18K yellow gold.", target: { karat: 18, colour: "Yellow Gold", weight: 10 } },
  { title: "The Valentine cuff", brief: "Cast a clean 20 g bar of 18K rose gold.", target: { karat: 18, colour: "Rose Gold", weight: 20 } },
  { title: "The bridal set", brief: "Cast a clean 1 troy ounce bar of 18K white gold.", target: { karat: 18, colour: "White Gold", weight: 31.1 } },
  { title: "The investment bar", brief: "Cast a clean 1 troy ounce bar of 24K pure gold.", target: { karat: 24, colour: "Pure Gold", weight: 31.1 } },
];

/* ---------- Assay math ---------- */

function assay(mix: Mix) {
  const total = mix.gold + mix.copper + mix.silver + mix.palladium;
  const purity = total > 0 ? (mix.gold / total) * 100 : 0;
  const karat = total > 0 ? (mix.gold / total) * 24 : 0;
  const hallmark = Math.round(purity * 10);
  const alloy = mix.copper + mix.silver + mix.palladium;
  let colour: ColourName;
  let colourNote: string;
  if (alloy === 0 && mix.gold > 0) {
    colour = "Pure Gold";
    colourNote = "Bullion-grade 24K, far too soft to set a stone or wear daily.";
  } else if (alloy === 0) {
    colour = "Pure Gold";
    colourNote = "The crucible is empty. Add some grams to smelt.";
  } else {
    const cR = mix.copper / alloy;
    const pR = mix.palladium / alloy;
    const sR = mix.silver / alloy;
    if (pR > 0.3) {
      colour = "White Gold";
      colourNote = "Palladium overwhelms the underlying yellow, bleaching toward cool silvery white.";
    } else if (cR > 0.55) {
      colour = "Rose Gold";
      colourNote = "Copper dominates, warming the metal into pink-red.";
    } else if (sR > 0.6 && cR < 0.25) {
      colour = "Green-Tinted Gold";
      colourNote = "High silver with almost no copper pulls toward antique green gold.";
    } else {
      colour = "Yellow Gold";
      colourNote = "Balanced copper and silver keeps the alloy near gold's natural warm yellow.";
    }
  }
  // nearest bar within 3%
  let nearestBar: number | null = null;
  let cleanPour = false;
  for (const size of BAR_SIZES) {
    const delta = Math.abs(total - size) / size;
    if (nearestBar === null || delta < Math.abs(total - nearestBar) / nearestBar) {
      nearestBar = size;
    }
  }
  if (nearestBar !== null && total > 0) {
    cleanPour = Math.abs(total - nearestBar) / nearestBar <= 0.03;
  }
  return { total, purity, karat, hallmark, colour, colourNote, nearestBar, cleanPour };
}

function alloyRGB(mix: Mix): [number, number, number] {
  const total = mix.gold + mix.copper + mix.silver + mix.palladium;
  if (total === 0) return [222, 178, 74];
  let r = 0, g = 0, b = 0;
  for (const m of METALS) {
    const w = mix[m.key] / total;
    r += m.color[0] * w;
    g += m.color[1] * w;
    b += m.color[2] * w;
  }
  return [Math.round(r), Math.round(g), Math.round(b)];
}

/* ---------- Stage state ---------- */

type Stage = "idle" | "weigh" | "charge" | "melt" | "pour" | "cool" | "assay";

const STAGE_LABEL: Record<Stage, string> = {
  idle: "Ready",
  weigh: "Weigh",
  charge: "Charge",
  melt: "Melt",
  pour: "Pour",
  cool: "Cast & cool",
  assay: "Assay",
};

const STAGES: Stage[] = ["weigh", "charge", "melt", "pour", "cool", "assay"];

/* ---------- Canvas scene ---------- */

type SceneProps = {
  mix: Mix;
  stage: Stage;
  progress: number; // 0..1 within stage
  reduced: boolean;
  temperature: number; // °C during melt/pour
};

function CrucibleScene({ mix, stage, progress, reduced, temperature }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number }[]
  >([]);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    let last = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(64, now - last);
      last = now;
      tRef.current += dt;
      render(ctx, canvas, mix, stage, progress, reduced, temperature, particlesRef.current, tRef.current, dt);
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [mix, stage, progress, reduced, temperature]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(60,30,10,0.35),#0b0a08_70%)]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7))]" />
      <div className="absolute left-4 top-4 flex items-center gap-2 border border-gold/30 bg-obsidian/60 px-3 py-1.5 backdrop-blur-sm">
        <Flame className="h-3.5 w-3.5 text-gold" />
        <span className="font-numeric text-[10px] uppercase tracking-[0.28em] text-gold">
          {stage === "idle" ? "Furnace cold" : `${STAGE_LABEL[stage]}${stage === "melt" || stage === "pour" ? ` · ${Math.round(temperature)}°C` : ""}`}
        </span>
      </div>
    </div>
  );
}

function render(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  mix: Mix,
  stage: Stage,
  progress: number,
  reduced: boolean,
  temperature: number,
  particles: { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number }[],
  t: number,
  dt: number,
) {
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);

  // Furnace floor
  const grd = ctx.createRadialGradient(w * 0.5, h * 0.65, 20, w * 0.5, h * 0.65, w * 0.7);
  const heat = stage === "melt" || stage === "pour" ? Math.min(1, temperature / 1600) : 0;
  grd.addColorStop(0, `rgba(${120 + heat * 130}, ${40 + heat * 100}, ${10 + heat * 30}, ${0.35 + heat * 0.4})`);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Coordinates
  const cx = w * 0.42;
  const cy = h * 0.55;
  const crW = w * 0.28;
  const crH = h * 0.34;

  const tilt =
    stage === "pour"
      ? Math.min(1, progress) * 0.9
      : stage === "cool" || stage === "assay"
        ? 0
        : 0;

  // Crucible
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-tilt);

  // outer glow when hot
  if (heat > 0.05) {
    ctx.shadowColor = `rgba(255, ${140 + heat * 60}, 40, ${0.5 * heat})`;
    ctx.shadowBlur = 40 * heat;
  }

  // crucible body: trapezoid
  ctx.beginPath();
  ctx.moveTo(-crW / 2, -crH / 2);
  ctx.lineTo(crW / 2, -crH / 2);
  ctx.lineTo(crW / 2 - 12, crH / 2);
  ctx.lineTo(-crW / 2 + 12, crH / 2);
  ctx.closePath();
  const bodyGrd = ctx.createLinearGradient(0, -crH / 2, 0, crH / 2);
  const bodyHeat = 0.3 + heat * 0.7;
  bodyGrd.addColorStop(0, `rgb(${50 + bodyHeat * 180},${30 + bodyHeat * 60},${20 + bodyHeat * 20})`);
  bodyGrd.addColorStop(1, `rgb(${25 + bodyHeat * 100},${18 + bodyHeat * 30},${14})`);
  ctx.fillStyle = bodyGrd;
  ctx.fill();
  ctx.strokeStyle = `rgba(255,${180 - heat * 40},80,${0.3 + heat * 0.5})`;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Contents by stage
  const total = mix.gold + mix.copper + mix.silver + mix.palladium;
  const rimTop = -crH / 2 + 6;
  const rimBottom = crH / 2 - 6;
  const fillMax = rimBottom - rimTop;

  if (stage === "charge" || stage === "weigh") {
    // draw granule piles inside
    const chargeProg = stage === "charge" ? progress : 0;
    let yStack = rimBottom;
    for (const m of METALS) {
      const grams = mix[m.key] * chargeProg;
      if (grams <= 0) continue;
      const layerH = Math.min(fillMax * 0.9, (grams / 60) * fillMax * 0.9);
      for (let i = 0; i < Math.min(60, grams * 6); i++) {
        const px = (Math.random() - 0.5) * (crW * 0.7);
        const py = yStack - Math.random() * layerH;
        ctx.fillStyle = `rgb(${m.color[0]},${m.color[1]},${m.color[2]})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.6 + Math.random() * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      yStack -= layerH;
    }
  } else if (stage === "melt" || stage === "pour" || stage === "cool" || stage === "assay") {
    // molten pool: fill based on total (scaled) and melted fraction
    const meltFrac = stage === "melt" ? progress : 1;
    const fillFrac = Math.min(1, total / 80);
    const surfaceY = rimBottom - fillMax * fillFrac;

    // background metal: solid granules receding as they melt
    if (stage === "melt" && meltFrac < 1) {
      let yStack = rimBottom;
      for (const m of METALS) {
        const grams = mix[m.key];
        if (grams <= 0) continue;
        // metal remains solid until temperature > meltC
        const solid = temperature < m.meltC ? 1 : Math.max(0, 1 - (temperature - m.meltC) / 200);
        const layerH = (grams / 60) * fillMax * 0.9 * solid;
        for (let i = 0; i < Math.min(50, grams * 5 * solid); i++) {
          const px = (Math.random() - 0.5) * (crW * 0.7);
          const py = yStack - Math.random() * layerH;
          ctx.fillStyle = `rgb(${m.color[0]},${m.color[1]},${m.color[2]})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        yStack -= layerH;
      }
    }

    // molten surface (mix color, brightened by heat)
    const [ar, ag, ab] = alloyRGB(mix);
    const bright = stage === "cool" ? Math.max(0, 1 - progress) : stage === "assay" ? 0 : 0.6 + heat * 0.4;
    const surfR = Math.min(255, ar + bright * 80);
    const surfG = Math.min(255, ag + bright * 40);
    const surfB = Math.min(255, ab + bright * 10);

    ctx.beginPath();
    ctx.moveTo(-crW / 2 + 8, surfaceY);
    ctx.lineTo(crW / 2 - 8, surfaceY);
    ctx.lineTo(crW / 2 - 12, rimBottom);
    ctx.lineTo(-crW / 2 + 12, rimBottom);
    ctx.closePath();
    const molten = ctx.createLinearGradient(0, surfaceY, 0, rimBottom);
    molten.addColorStop(0, `rgb(${surfR},${surfG},${surfB})`);
    molten.addColorStop(1, `rgb(${Math.max(0, surfR - 60)},${Math.max(0, surfG - 60)},${Math.max(0, surfB - 60)})`);
    ctx.fillStyle = molten;
    ctx.fill();

    // shimmer highlights on surface
    if (!reduced && (stage === "melt" || stage === "pour")) {
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 3; i++) {
        const wave = Math.sin(t / 300 + i * 1.7) * 4;
        ctx.strokeStyle = `rgba(255,${220 - i * 20},160,0.35)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-crW / 2 + 10, surfaceY + wave * 0.3 + i * 2);
        ctx.bezierCurveTo(
          -crW / 4, surfaceY - 2 + wave,
          crW / 4, surfaceY + 2 + wave,
          crW / 2 - 10, surfaceY + wave * 0.3 + i * 2,
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // pour stream
    if (stage === "pour") {
      ctx.save();
      ctx.rotate(tilt); // undo tilt so stream is world-aligned
      const streamStartX = crW / 2 - 14;
      const streamStartY = surfaceY - 4;
      // rotate back accounts for tilt visually
      ctx.strokeStyle = `rgb(${surfR},${surfG},${surfB})`;
      ctx.lineWidth = 3 + Math.sin(t / 60) * 0.6;
      ctx.beginPath();
      ctx.moveTo(streamStartX, streamStartY);
      ctx.bezierCurveTo(streamStartX + 30, streamStartY + 40, streamStartX + 60, streamStartY + 100, streamStartX + 140, streamStartY + 160);
      ctx.stroke();
      ctx.restore();
    }
  }

  ctx.restore();

  // Bar mould (right side)
  const barX = w * 0.72;
  const barY = h * 0.78;
  const barW = w * 0.22;
  const barH = h * 0.09;

  // mould
  ctx.fillStyle = "rgba(20,15,10,0.8)";
  ctx.strokeStyle = "rgba(180,150,90,0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(barX - 6, barY - 6, barW + 12, barH + 12);
  ctx.fill();
  ctx.stroke();

  // filling
  let fillProgress = 0;
  if (stage === "pour") fillProgress = progress;
  else if (stage === "cool" || stage === "assay") fillProgress = 1;

  if (fillProgress > 0) {
    const [ar, ag, ab] = alloyRGB(mix);
    let br: number, bg: number, bb: number;
    if (stage === "pour") {
      // white-hot
      br = 255; bg = 230; bb = 190;
    } else if (stage === "cool") {
      // ramp from white-hot to final color
      const p = progress;
      br = Math.round(255 * (1 - p) + ar * p);
      bg = Math.round(230 * (1 - p) + ag * p);
      bb = Math.round(190 * (1 - p) + ab * p);
    } else {
      br = ar; bg = ag; bb = ab;
    }
    const barGrd = ctx.createLinearGradient(barX, barY, barX, barY + barH);
    barGrd.addColorStop(0, `rgb(${Math.min(255, br + 30)},${Math.min(255, bg + 20)},${Math.min(255, bb + 10)})`);
    barGrd.addColorStop(1, `rgb(${Math.max(0, br - 40)},${Math.max(0, bg - 40)},${Math.max(0, bb - 40)})`);
    ctx.fillStyle = barGrd;
    ctx.fillRect(barX, barY, barW * fillProgress, barH);

    // hallmark stamp on assay
    if (stage === "assay") {
      const { hallmark, karat } = assay(mix);
      ctx.save();
      ctx.translate(barX + barW * 0.5, barY + barH * 0.5);
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.font = `600 ${Math.round(barH * 0.35)}px "Cormorant Garamond", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${hallmark || "—"}`, 0, -barH * 0.05);
      ctx.font = `500 ${Math.round(barH * 0.16)}px "Jost", sans-serif`;
      ctx.fillText(`${Math.round(karat)}K`, 0, barH * 0.22);
      ctx.restore();
    }
  }

  // Particles: embers rise during melt/pour
  if (!reduced && (stage === "melt" || stage === "pour")) {
    const spawn = stage === "pour" ? 4 : 2;
    for (let i = 0; i < spawn; i++) {
      particles.push({
        x: cx + (Math.random() - 0.5) * crW * 0.5,
        y: cy - crH / 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.4 - Math.random() * 0.6,
        life: 0,
        max: 800 + Math.random() * 800,
        hue: 20 + Math.random() * 30,
      });
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life += dt;
    p.x += p.vx * dt * 0.06;
    p.y += p.vy * dt * 0.06;
    p.vy -= 0.0004 * dt;
    if (p.life > p.max) {
      particles.splice(i, 1);
      continue;
    }
    const a = 1 - p.life / p.max;
    ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${a * 0.9})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.4 + a * 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  if (particles.length > 400) particles.splice(0, particles.length - 400);
}

/* ---------- Reducer ---------- */

type Action =
  | { type: "set"; metal: MetalKey; grams: number }
  | { type: "adjust"; metal: MetalKey; delta: number }
  | { type: "reset" }
  | { type: "preset"; mix: Mix };

function mixReducer(state: Mix, action: Action): Mix {
  switch (action.type) {
    case "set":
      return { ...state, [action.metal]: clamp(action.grams) };
    case "adjust":
      return { ...state, [action.metal]: clamp(state[action.metal] + action.delta) };
    case "reset":
      return { ...ZERO_MIX };
    case "preset":
      return { ...action.mix };
  }
}

function clamp(g: number) {
  return Math.max(0, Math.min(MAX_PER_METAL, Math.round(g / STEP) * STEP));
}

/* ---------- Page ---------- */

function SmeltLabPage() {
  const reduced = useReducedMotion() ?? false;
  const [mix, dispatch] = useReducer(mixReducer, { gold: 7.5, copper: 1.25, silver: 1.25, palladium: 0 });
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [temperature, setTemperature] = useState(20);
  const [skip, setSkip] = useState(false);
  const stageRef = useRef<Stage>("idle");
  stageRef.current = stage;
  const rafRef = useRef<number | null>(null);
  const stageStartRef = useRef<number>(0);

  const currentAssay = useMemo(() => assay(mix), [mix]);
  const [preview, setPreview] = useState(false); // show live assay preview overlay

  // stage durations (ms)
  const durations = useMemo(
    () => (reduced || skip
      ? { weigh: 300, charge: 300, melt: 500, pour: 400, cool: 400, assay: 200 }
      : { weigh: 1200, charge: 1400, melt: 3200, pour: 1600, cool: 1600, assay: 400 }),
    [reduced, skip],
  );

  const runStage = useCallback((s: Stage) => {
    setStage(s);
    setProgress(0);
    stageStartRef.current = performance.now();
    const dur = s === "idle" ? 0 : durations[s as Exclude<Stage, "idle">];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const tick = (now: number) => {
      const p = Math.min(1, (now - stageStartRef.current) / dur);
      setProgress(p);
      // temperature curve
      if (s === "melt") {
        setTemperature(20 + p * 1600);
      } else if (s === "pour") {
        setTemperature(1600 - p * 200);
      } else if (s === "cool") {
        setTemperature(1400 - p * 1200);
      } else if (s === "assay") {
        setTemperature(200);
      }
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // advance
        const idx = STAGES.indexOf(s);
        if (idx >= 0 && idx < STAGES.length - 1) {
          const next = STAGES[idx + 1];
          setTimeout(() => runStage(next), 40);
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [durations]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const smelt = useCallback(() => {
    if (currentAssay.total <= 0) return;
    setSkip(false);
    runStage("weigh");
  }, [currentAssay.total, runStage]);

  const skipAnimation = useCallback(() => {
    setSkip(true);
    setStage("assay");
    setProgress(1);
    setTemperature(200);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setStage("idle");
    setProgress(0);
    setTemperature(20);
  }, []);

  const busy = stage !== "idle" && stage !== "assay";

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Hero />

        <Section id="lab" className="pt-8 md:pt-12 scroll-mt-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              {/* Controls */}
              <div className="lg:col-span-5">
                <Reveal>
                  <Eyebrow>I. Pour your recipe</Eyebrow>
                  <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    Blend four metals. Watch the karat emerge.
                  </h2>
                  <p className={`mt-4 ${luxury.bodyMuted}`}>
                    Adjust in half-gram steps. The purity, karat, colour, and hallmark update the moment the mix changes.
                  </p>
                </Reveal>

                <Reveal>
                  <PresetPicker
                    onSelect={(p) => {
                      reset();
                      dispatch({ type: "preset", mix: p.mix });
                    }}
                  />
                </Reveal>

                <div className="mt-8 space-y-3">
                  {METALS.map((m) => (
                    <MetalJar
                      key={m.key}
                      metal={m}
                      grams={mix[m.key]}
                      disabled={busy}
                      onChange={(g) => dispatch({ type: "set", metal: m.key, grams: g })}
                      onAdjust={(d) => dispatch({ type: "adjust", metal: m.key, delta: d })}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <LuxButton
                    onClick={smelt}
                    disabled={busy || currentAssay.total <= 0}
                    icon={<Flame className="h-3.5 w-3.5" />}
                  >
                    {stage === "assay" ? "Smelt again" : "Smelt batch"}
                  </LuxButton>
                  <LuxButton
                    variant="ghost"
                    onClick={() => {
                      reset();
                      dispatch({ type: "reset" });
                    }}
                    icon={<RotateCcw className="h-3.5 w-3.5" />}
                  >
                    Reset crucible
                  </LuxButton>
                  {busy ? (
                    <button
                      type="button"
                      onClick={skipAnimation}
                      className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-platinum/80 transition-colors hover:border-gold/60 hover:text-gold"
                    >
                      <SkipForward className="h-3 w-3" /> Skip
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setPreview((v) => !v)}
                    className={cn(
                      "inline-flex items-center gap-2 border px-3 py-2 text-[11px] uppercase tracking-[0.28em] transition-colors",
                      preview ? "border-gold/60 text-gold" : "border-white/15 text-platinum/80 hover:border-gold/60 hover:text-gold",
                    )}
                  >
                    <Gauge className="h-3 w-3" /> Live readout
                  </button>
                </div>
              </div>

              {/* Scene + Result */}
              <div className="lg:col-span-7">
                <div className="relative">
                  <CrucibleScene
                    mix={mix}
                    stage={stage}
                    progress={progress}
                    reduced={reduced}
                    temperature={temperature}
                  />

                  {/* Stage timeline */}
                  <div className="mt-4 grid grid-cols-6 gap-1">
                    {STAGES.map((s) => {
                      const idx = STAGES.indexOf(stage as Stage);
                      const sIdx = STAGES.indexOf(s);
                      const active = stage !== "idle" && sIdx <= idx;
                      const current = s === stage;
                      return (
                        <div key={s} className="space-y-1">
                          <div
                            className={cn(
                              "h-px w-full transition-colors duration-500",
                              active ? "bg-gold" : "bg-white/10",
                            )}
                          />
                          <div
                            className={cn(
                              "font-numeric text-[9px] uppercase tracking-[0.24em] transition-colors",
                              current ? "text-gold" : active ? "text-ivory/80" : "text-platinum/40",
                            )}
                          >
                            {STAGE_LABEL[s]}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {preview ? <LivePreview a={currentAssay} /> : null}
                </div>

                <AnimatePresence>
                  {stage === "assay" ? (
                    <motion.div
                      key="assay"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0.15 : 0.7, ease: luxury.ease }}
                    >
                      <AssayCard a={currentAssay} mix={mix} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </Container>
        </Section>

        <ChallengeBoard mix={mix} currentAssay={currentAssay} onLoad={(m) => { reset(); dispatch({ type: "preset", mix: m }); }} />

        <Reference />

        <Section id="quiz" bordered tinted className="scroll-mt-24">
          <Container narrow>
            <SectionHeader
              index="V"
              eyebrow="Knowledge Check"
              title="Test what the crucible taught you."
              intro="Three questions on karat maths, alloy colour, and hallmark grades. A private study aid, not a graded test."
            />
            <KnowledgeCheck questions={QUIZ} />
          </Container>
        </Section>

        <CloseCTA />
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pt-56">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,120,40,0.18),transparent_60%)]" />
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-numeric text-[12px] tracking-[0.32em] text-gold">IX</span>
            <span className="h-px w-14 bg-gold/60" />
            <Eyebrow>Flagship Interactive</Eyebrow>
          </div>
        </Reveal>
        <Reveal>
          <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-[8rem]">
            The Smelt Lab.
          </h1>
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-2xl font-display text-2xl italic leading-snug text-platinum/85 md:text-3xl">
            Learn karats by mixing them.
          </p>
        </Reveal>
        <Reveal>
          <p className={`mt-6 max-w-2xl ${luxury.bodyMuted}`}>
            Pure gold is too soft to wear on its own. Every karat you have ever bought is a recipe, gold blended with other metals for strength, colour, and price. Pour your own mix below and watch the karat, purity, and colour come out in real time.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LuxButton asChild icon={<ArrowRight className="h-3.5 w-3.5" />}>
              <a href="#lab">Enter the Lab</a>
            </LuxButton>
            <LuxButton asChild variant="ghost">
              <Link to="/institutes/$slug" params={{ slug: "precious-metals" }}>
                Precious Metals Institute
              </Link>
            </LuxButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Preset picker ---------- */

function PresetPicker({ onSelect }: { onSelect: (p: Preset) => void }) {
  return (
    <div className="mt-8">
      <Eyebrow muted>Recipe presets</Eyebrow>
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => onSelect(p)}
            className="group border border-white/10 px-3 py-2 text-left transition-colors hover:border-gold/60"
            title={p.hint}
          >
            <span className="block font-display text-sm text-ivory group-hover:text-gold">{p.name}</span>
            <span className="block font-numeric text-[9px] uppercase tracking-[0.24em] text-platinum/60">
              {p.hint}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Metal jar row ---------- */

function MetalJar({
  metal,
  grams,
  disabled,
  onChange,
  onAdjust,
}: {
  metal: Metal;
  grams: number;
  disabled: boolean;
  onChange: (g: number) => void;
  onAdjust: (d: number) => void;
}) {
  const swatch = `rgb(${metal.color[0]},${metal.color[1]},${metal.color[2]})`;
  return (
    <div className="border border-white/10 bg-charcoal/30 p-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-6 w-6 rounded-sm border border-white/10"
          style={{ background: `linear-gradient(135deg, ${swatch}, rgba(0,0,0,0.4))` }}
        />
        <div className="min-w-0 flex-1">
          <div className="font-display text-sm text-ivory">{metal.label}</div>
          <div className="font-numeric text-[10px] uppercase tracking-[0.24em] text-platinum/60">
            {metal.short} · melt {metal.meltC}°C
          </div>
        </div>
        <div className="text-right">
          <div className="font-numeric text-lg text-gold tabular-nums">{grams.toFixed(1)}<span className="text-[10px] text-platinum/60"> g</span></div>
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-platinum/60">{metal.note}</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          disabled={disabled || grams <= 0}
          onClick={() => onAdjust(-STEP)}
          className="h-8 w-8 border border-white/15 text-ivory transition-colors hover:border-gold/60 hover:text-gold disabled:opacity-30"
          aria-label={`Remove 0.5 grams of ${metal.label}`}
        >
          −
        </button>
        <input
          type="range"
          min={0}
          max={MAX_PER_METAL}
          step={STEP}
          value={grams}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-[color:var(--gold)] disabled:opacity-50"
          aria-label={`${metal.label} grams`}
        />
        <button
          type="button"
          disabled={disabled || grams >= MAX_PER_METAL}
          onClick={() => onAdjust(STEP)}
          className="h-8 w-8 border border-white/15 text-ivory transition-colors hover:border-gold/60 hover:text-gold disabled:opacity-30"
          aria-label={`Add 0.5 grams of ${metal.label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

/* ---------- Live preview overlay ---------- */

function LivePreview({ a }: { a: ReturnType<typeof assay> }) {
  return (
    <div className="pointer-events-none absolute right-3 top-3 border border-gold/40 bg-obsidian/80 px-4 py-3 backdrop-blur-sm">
      <div className="grid grid-cols-3 gap-4 text-right">
        <div>
          <div className="font-numeric text-[9px] uppercase tracking-[0.24em] text-platinum/60">Karat</div>
          <div className="font-display text-xl text-gold">{a.karat.toFixed(1)}K</div>
        </div>
        <div>
          <div className="font-numeric text-[9px] uppercase tracking-[0.24em] text-platinum/60">Purity</div>
          <div className="font-display text-xl text-ivory">{a.purity.toFixed(1)}%</div>
        </div>
        <div>
          <div className="font-numeric text-[9px] uppercase tracking-[0.24em] text-platinum/60">Weight</div>
          <div className="font-display text-xl text-ivory">{a.total.toFixed(1)}g</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Assay card ---------- */

function AssayCard({ a, mix }: { a: ReturnType<typeof assay>; mix: Mix }) {
  const [r, g, b] = alloyRGB(mix);
  return (
    <div className="mt-10 border border-gold/30 bg-charcoal/40">
      <div className="grid gap-px bg-white/5 md:grid-cols-4">
        <div className="bg-charcoal/70 p-6">
          <Eyebrow>Fine karat</Eyebrow>
          <div className="mt-3 font-display text-5xl text-gold">{a.karat.toFixed(1)}<span className="text-2xl">K</span></div>
        </div>
        <div className="bg-charcoal/70 p-6">
          <Eyebrow>Hallmark</Eyebrow>
          <div className="mt-3 font-display text-5xl text-ivory">{a.hallmark || "—"}</div>
          <div className="mt-1 font-numeric text-[10px] uppercase tracking-[0.24em] text-platinum/60">
            millesimal fineness
          </div>
        </div>
        <div className="bg-charcoal/70 p-6">
          <Eyebrow>Purity</Eyebrow>
          <div className="mt-3 font-display text-5xl text-ivory">{a.purity.toFixed(1)}<span className="text-2xl">%</span></div>
        </div>
        <div className="bg-charcoal/70 p-6">
          <Eyebrow>Total mass</Eyebrow>
          <div className="mt-3 font-display text-5xl text-ivory">{a.total.toFixed(1)}<span className="text-2xl">g</span></div>
        </div>
      </div>
      <div className="grid gap-px bg-white/5 md:grid-cols-2">
        <div className="bg-charcoal/70 p-6">
          <Eyebrow>Alloy colour</Eyebrow>
          <div className="mt-4 flex items-center gap-4">
            <span
              aria-hidden
              className="h-16 w-16 rounded-sm border border-white/10"
              style={{ background: `linear-gradient(135deg, rgb(${r},${g},${b}), rgba(0,0,0,0.5))` }}
            />
            <div>
              <div className="font-display text-2xl text-ivory">{a.colour}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-platinum/70">{a.colourNote}</p>
            </div>
          </div>
        </div>
        <div className="bg-charcoal/70 p-6">
          <Eyebrow>Nearest standard bar</Eyebrow>
          <div className="mt-4 flex items-baseline gap-3">
            <div className="font-display text-3xl text-ivory">{a.nearestBar ?? "—"}<span className="text-lg text-platinum/60"> g</span></div>
            {a.nearestBar === 31.1 ? (
              <span className="font-numeric text-[10px] uppercase tracking-[0.24em] text-platinum/60">1 troy oz</span>
            ) : null}
          </div>
          <p
            className={cn(
              "mt-3 text-[13px] leading-relaxed",
              a.cleanPour ? "text-gold" : "text-platinum/70",
            )}
          >
            {a.cleanPour
              ? `Clean pour, casts a standard ${a.nearestBar} g bar.`
              : `Off by ${a.nearestBar ? Math.abs(a.total - a.nearestBar).toFixed(2) : "—"} g. Adjust the mix within 3% of a standard size for a clean cast.`}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Challenges ---------- */

function ChallengeBoard({
  mix,
  currentAssay,
  onLoad,
}: {
  mix: Mix;
  currentAssay: ReturnType<typeof assay>;
  onLoad: (m: Mix) => void;
}) {
  return (
    <Section id="challenges" bordered className="scroll-mt-24">
      <Container>
        <SectionHeader
          index="III"
          eyebrow="Challenges"
          title="Cast to a jeweller's brief."
          intro="Match a real commission. The pour is clean when the mix hits the target karat, colour, and weight within 3%."
        />
        <ul className="grid gap-px bg-white/5 md:grid-cols-2">
          {CHALLENGES.map((c) => {
            const passed =
              Math.abs(currentAssay.karat - c.target.karat) <= 0.5 &&
              currentAssay.colour === c.target.colour &&
              c.target.weight > 0 &&
              Math.abs(currentAssay.total - c.target.weight) / c.target.weight <= 0.03;
            return (
              <li key={c.title} className="bg-obsidian p-8">
                <div className="flex items-center justify-between">
                  <Eyebrow>{c.title}</Eyebrow>
                  <span
                    className={cn(
                      "font-numeric text-[10px] uppercase tracking-[0.24em]",
                      passed ? "text-gold" : "text-platinum/50",
                    )}
                  >
                    {passed ? "Achieved" : "Open"}
                  </span>
                </div>
                <p className="mt-4 font-display text-xl text-ivory md:text-2xl">{c.brief}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-platinum/70">
                  <span>Target karat: <span className="text-ivory">{c.target.karat}K</span></span>
                  <span>Colour: <span className="text-ivory">{c.target.colour}</span></span>
                  <span>Weight: <span className="text-ivory">{c.target.weight} g</span></span>
                </div>
                <button
                  type="button"
                  onClick={() => onLoad(suggestMix(c.target))}
                  className="mt-6 inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-platinum/80 transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <Sparkles className="h-3 w-3" /> Load a starting mix
                </button>
              </li>
            );
          })}
        </ul>
        <p className={`mt-6 max-w-2xl text-[12px] ${luxury.bodyMuted}`}>
          The suggestion loads a plausible starting recipe. Tune each metal by half-gram to hit the challenge cleanly.
        </p>
      </Container>
    </Section>
  );
}

function suggestMix(target: Challenge["target"]): Mix {
  const w = target.weight;
  const goldFrac = target.karat / 24;
  const gold = w * goldFrac;
  const alloy = w - gold;
  if (target.colour === "Rose Gold") return { gold, copper: alloy * 0.9, silver: alloy * 0.1, palladium: 0 };
  if (target.colour === "White Gold") return { gold, copper: 0, silver: alloy * 0.4, palladium: alloy * 0.6 };
  if (target.colour === "Pure Gold") return { gold: w, copper: 0, silver: 0, palladium: 0 };
  return { gold, copper: alloy * 0.5, silver: alloy * 0.5, palladium: 0 };
}

/* ---------- Reference ---------- */

const KARAT_ROWS = [
  { k: "24K", pct: "99.9%", hall: "999", note: "Investment bars and coins, too soft for daily wear." },
  { k: "22K", pct: "91.6%", hall: "916", note: "Traditional Middle Eastern and South Asian jewellery." },
  { k: "18K", pct: "75.0%", hall: "750", note: "The fine jewellery standard, durable and warm." },
  { k: "14K", pct: "58.5%", hall: "585", note: "US retail workhorse, harder and more affordable." },
  { k: "10K", pct: "41.7%", hall: "417", note: "Minimum legal karat in the United States." },
  { k: "9K", pct: "37.5%", hall: "375", note: "UK and EU entry point, common on the high street." },
];

function Reference() {
  return (
    <Section id="reference" bordered tinted className="scroll-mt-24">
      <Container>
        <SectionHeader
          index="IV"
          eyebrow="Reference"
          title="The karat table, in plain figures."
        />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="border border-white/10">
              <div className="grid grid-cols-12 border-b border-white/10 bg-charcoal/40 px-5 py-3 font-numeric text-[10px] uppercase tracking-[0.28em] text-platinum/70">
                <div className="col-span-2">Karat</div>
                <div className="col-span-2">Purity</div>
                <div className="col-span-2">Hallmark</div>
                <div className="col-span-6">Where you see it</div>
              </div>
              {KARAT_ROWS.map((r) => (
                <div key={r.k} className="grid grid-cols-12 items-center border-b border-white/5 px-5 py-4 last:border-b-0">
                  <div className="col-span-2 font-display text-lg text-gold">{r.k}</div>
                  <div className="col-span-2 font-numeric text-sm text-ivory">{r.pct}</div>
                  <div className="col-span-2 font-numeric text-sm text-ivory">{r.hall}</div>
                  <div className="col-span-6 text-[13px] leading-relaxed text-platinum/70">{r.note}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 space-y-6">
            <NoteCard
              title="Why alloy at all"
              body="Fine gold is malleable enough to dent with a fingernail. Copper, silver, and palladium each contribute hardness, workability, and price control. Without them, a ring would deform in a week."
            />
            <NoteCard
              title="Colour is a ratio"
              body="Yellow, rose, white, and green are not pigments, they are the balance of copper, silver, and palladium against a fixed proportion of gold. Change one metal and the colour drifts before the karat does."
            />
            <NoteCard
              title="Hallmark versus karat"
              body="The hallmark stamp is millesimal, purity times a thousand. 18K reads 750, 14K reads 585. Some jurisdictions require an assay office punch beside the number, others accept the maker's mark alone."
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function NoteCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-white/10 p-6">
      <div className="flex items-center gap-2 text-gold">
        <Info className="h-4 w-4" />
        <Eyebrow>{title}</Eyebrow>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-platinum/80">{body}</p>
    </div>
  );
}

/* ---------- Close CTA ---------- */

function CloseCTA() {
  return (
    <Section className="scroll-mt-24">
      <Container narrow>
        <Hairline className="mx-auto w-32" />
        <div className="mt-10 text-center">
          <Eyebrow>Continue your studies</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
            The Smelt Lab is one door. The Institutes hold the discipline.
          </h2>
          <p className={`mx-auto mt-6 max-w-xl ${luxury.bodyMuted}`}>
            Six chapters at Precious Metals cover assay, refining, market, and stewardship in full.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LuxButton asChild icon={<ArrowRight className="h-3.5 w-3.5" />}>
              <Link to="/institutes/$slug" params={{ slug: "precious-metals" }}>Enter Precious Metals</Link>
            </LuxButton>
            <LuxButton asChild variant="ghost">
              <Link to="/knowledge">Knowledge Hub</Link>
            </LuxButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- Quiz ---------- */

const QUIZ = [
  {
    prompt: "A 20 g mix contains 15 g of fine gold and 5 g of copper. What is the karat?",
    options: [
      { text: "24K" },
      { text: "22K" },
      { text: "18K", correct: true },
      { text: "14K" },
    ],
    explanation: "Karat is gold divided by total, times 24. 15 ÷ 20 × 24 equals 18K, which stamps 750 as its hallmark.",
  },
  {
    prompt: "You want an 18K rose gold that reads unmistakably pink. Which alloy split moves you there?",
    options: [
      { text: "Copper 90%, silver 10% of the alloy portion", correct: true },
      { text: "Silver 90%, copper 10% of the alloy portion" },
      { text: "Palladium 60%, silver 40% of the alloy portion" },
      { text: "Copper 30%, silver 30%, palladium 40%" },
    ],
    explanation: "Rose gold requires copper to exceed roughly 55% of the alloy portion. Palladium-heavy mixes read as white gold instead.",
  },
  {
    prompt: "A jeweller's stamp reads 585. What karat does that identify?",
    options: [
      { text: "22K" },
      { text: "18K" },
      { text: "14K", correct: true },
      { text: "10K" },
    ],
    explanation: "The hallmark is millesimal, purity times a thousand. 585 corresponds to 58.5% pure gold, which is 14K.",
  },
];
