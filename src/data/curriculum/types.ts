/**
 * Real lesson content for a single chapter, layered on top of the
 * lightweight `CurriculumModule` summary in `src/data/institutes.ts`.
 *
 * Kept as a separate, optional data layer so that institutes without
 * written lessons yet fall back gracefully to the existing summary view
 * (see `getChapter` in institutes.ts and the fallback in the chapter route).
 */

export type QuizOption = {
  text: string;
  /** Marks the single correct option for a question. */
  correct?: boolean;
};

export type QuizQuestion = {
  prompt: string;
  options: QuizOption[];
  /** Shown after the learner submits an answer, correct or not. */
  explanation: string;
};

export type LessonSection = {
  heading: string;
  paragraphs: string[];
};

export type ChapterContent = {
  /** Roman numeral, must match the `chapter` field on the corresponding CurriculumModule. */
  chapter: string;
  reading: LessonSection[];
  takeaways: string[];
  quiz: QuizQuestion[];
};
