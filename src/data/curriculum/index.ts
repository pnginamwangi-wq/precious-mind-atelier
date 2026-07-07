import type { ChapterContent } from "./types";
import preciousMetals from "./precious-metals";
import bullion from "./bullion";
import numismatics from "./numismatics";
import gemstones from "./gemstones";
import jewellery from "./jewellery";
import horology from "./horology";
import luxuryRetail from "./luxury-retail";
import artificialIntelligence from "./artificial-intelligence";

export type { ChapterContent, LessonSection, QuizQuestion, QuizOption } from "./types";

/**
 * Written lesson content, keyed by institute slug. Institutes not yet
 * present here simply have no entry, and `getChapterContent` returns
 * `undefined` — callers fall back to the existing summary-only view.
 */
const CURRICULUM_CONTENT: Record<string, ChapterContent[]> = {
  "precious-metals": preciousMetals,
  "bullion": bullion,
  "numismatics": numismatics,
  "gemstones": gemstones,
  "jewellery": jewellery,
  "horology": horology,
  "luxury-retail": luxuryRetail,
  "artificial-intelligence": artificialIntelligence,
};

export function getChapterContent(
  instituteSlug: string,
  chapter: string,
): ChapterContent | undefined {
  const list = CURRICULUM_CONTENT[instituteSlug];
  if (!list) return undefined;
  return list.find((c) => c.chapter.toLowerCase() === chapter.trim().toLowerCase());
}
