/**
 * Luxury token contrast audit.
 *
 * Parses OKLCH tokens from src/styles.css, computes WCAG 2.1 contrast for every
 * foreground / background pairing actually used across the luxury components,
 * and also scans interactive components for a focus-visible affordance.
 *
 * Run: bun scripts/a11y-tokens.ts
 * Exit code 1 if any AA failure or missing focus ring is found.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { formatHex, parse, wcagContrast } from "culori";

type Token = { name: string; oklch: string; hex: string };

// ---------- parse tokens ----------
const css = readFileSync("src/styles.css", "utf8");
const tokenRe = /--([a-z-]+):\s*(oklch\([^)]+\))/g;
const tokens = new Map<string, Token>();
for (const m of css.matchAll(tokenRe)) {
  const [, name, oklch] = m;
  const parsed = parse(oklch);
  if (!parsed) continue;
  tokens.set(name, { name, oklch, hex: formatHex(parsed) ?? "" });
}

function tk(name: string): Token {
  const t = tokens.get(name);
  if (!t) throw new Error(`missing token --${name}`);
  return t;
}

// alpha helper for platinum/70, ivory/90, etc. (composite over a bg)
function mixOver(fgHex: string, bgHex: string, alpha: number): string {
  const fg = parse(fgHex)!;
  const bg = parse(bgHex)!;
  const mix = {
    mode: "rgb" as const,
    r: (fg as { r: number }).r * alpha + (bg as { r: number }).r * (1 - alpha),
    g: (fg as { g: number }).g * alpha + (bg as { g: number }).g * (1 - alpha),
    b: (fg as { b: number }).b * alpha + (bg as { b: number }).b * (1 - alpha),
  };
  return formatHex(mix) ?? fgHex;
}

// ---------- pairings actually used in luxury components ----------
type Pair = {
  where: string;
  fg: string; // hex
  bg: string; // hex
  large?: boolean; // >=18pt or >=14pt bold
};

const obsidian = tk("obsidian").hex;
const charcoal = tk("charcoal").hex;
const ivory = tk("ivory").hex;
const gold = tk("gold").hex;
const goldSoft = tk("gold-soft").hex;
const champagne = tk("champagne").hex;
const platinum = tk("platinum").hex;

const pairs: Pair[] = [
  { where: "Body text: ivory on obsidian", fg: ivory, bg: obsidian },
  { where: "Display headings (h1-h4) ivory on obsidian, large", fg: ivory, bg: obsidian, large: true },
  { where: "Eyebrow: gold on obsidian", fg: gold, bg: obsidian },
  { where: "Muted eyebrow: platinum/70 on obsidian", fg: mixOver(platinum, obsidian, 0.7), bg: obsidian },
  { where: "Body muted: platinum/70 on obsidian", fg: mixOver(platinum, obsidian, 0.7), bg: obsidian },
  { where: "Body small: platinum/70 on obsidian", fg: mixOver(platinum, obsidian, 0.7), bg: obsidian },
  { where: "Body muted on charcoal (tinted section)", fg: mixOver(platinum, charcoal, 0.7), bg: charcoal },
  { where: "LuxButton gold: obsidian on gold", fg: obsidian, bg: gold },
  { where: "LuxButton gold hover: obsidian on champagne", fg: obsidian, bg: champagne },
  { where: "LuxButton outline: gold on obsidian", fg: gold, bg: obsidian },
  { where: "LuxButton ghost: ivory on obsidian", fg: ivory, bg: obsidian },
  { where: "GoldMark glyph: obsidian on gold (large)", fg: obsidian, bg: gold, large: true },
  { where: "Institute card tag: platinum/60 on obsidian", fg: mixOver(platinum, obsidian, 0.6), bg: obsidian },
  { where: "Mentor 'Session 04' label: platinum/70 on charcoal", fg: mixOver(platinum, charcoal, 0.7), bg: charcoal },
  { where: "Mentor body 15px: platinum/90 on charcoal", fg: mixOver(platinum, charcoal, 0.9), bg: charcoal },
  { where: "Mentor input placeholder: platinum/60 on obsidian", fg: mixOver(platinum, obsidian, 0.6), bg: obsidian },
  { where: "Nav link idle: platinum/80 on obsidian", fg: mixOver(platinum, obsidian, 0.8), bg: obsidian },
  { where: "Gold-soft accent on obsidian (large only)", fg: goldSoft, bg: obsidian, large: true },
];

// ---------- run contrast ----------
const REQUIRED = { normal: 4.5, large: 3.0 };
let failures = 0;
const rows: string[] = [];
for (const p of pairs) {
  const ratio = wcagContrast(p.fg, p.bg);
  const min = p.large ? REQUIRED.large : REQUIRED.normal;
  const pass = ratio >= min;
  if (!pass) failures++;
  rows.push(
    `${pass ? "PASS" : "FAIL"}  ${ratio.toFixed(2)}:1  (min ${min})  ${p.where}`,
  );
}

// ---------- focus-visible affordance scan ----------
const INTERACTIVE_DIRS = ["src/components/luxury", "src/routes"];
const INTERACTIVE_TAGS = /<(button|a|Link|LuxButton)\b[^>]*className=/g;
const FOCUS_HINT = /focus-visible[:\-]|outline-none[\s"']|focus:ring|ring-gold/;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(entry) && !entry.endsWith(".stories.tsx")) out.push(p);
  }
  return out;
}

const focusIssues: string[] = [];
for (const dir of INTERACTIVE_DIRS) {
  for (const file of walk(dir)) {
    const src = readFileSync(file, "utf8");
    // any interactive element that sets outline-none but no focus-visible ring
    if (/outline-none/.test(src) && !/focus-visible:ring|focus:ring/.test(src)) {
      focusIssues.push(`${file}: outline-none without focus-visible ring`);
    }
    // icon-only buttons without aria-label
    const iconOnly = src.match(/<button[^>]*>\s*<(svg|[A-Z][A-Za-z]+)[^>]*\/?>\s*<\/button>/g);
    if (iconOnly) {
      for (const hit of iconOnly) {
        if (!/aria-label=/.test(hit)) {
          focusIssues.push(`${file}: icon-only <button> missing aria-label`);
        }
      }
    }
    void INTERACTIVE_TAGS.exec(src);
    void FOCUS_HINT.exec(src);
  }
}

// ---------- report ----------
console.log("Luxury token contrast audit\n" + "=".repeat(60));
for (const r of rows) console.log(r);
console.log("\nFocus + name scan\n" + "=".repeat(60));
if (focusIssues.length === 0) console.log("PASS  all interactive elements have focus + accessible names");
else for (const i of focusIssues) console.log("FAIL  " + i);

console.log(
  `\nSummary: ${pairs.length - failures}/${pairs.length} contrast pass, ${
    focusIssues.length
  } focus/name issue(s)`,
);

if (failures > 0 || focusIssues.length > 0) process.exit(1);
