/**
 * Types for The Library: reference pages for the objects that recur across
 * the Academy's curriculum. Content is timelessly true general knowledge only,
 * no fabricated prices, dates, sizes, or hallmark examples.
 */

export type FAQ = { question: string; answer: string };

export type LibraryItem = {
  slug: string;
  name: string;
  eyebrow: string;
  dek: string;
  overview: string[];
  history: string[];
  specifications: { label: string; value: string }[];
  valueFactors: { label: string; text: string }[];
  care: string[];
  faqs: FAQ[];
  salesGuidance: string[];
  relatedInstitutes: string[];
  relatedArticles?: string[];
  knowledgeCheck: {
    prompt: string;
    options: { text: string; correct?: boolean }[];
    explanation: string;
  }[];
};
