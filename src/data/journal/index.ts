import type { Article, JournalCategorySlug } from "./types";
import hallmarks from "./articles/hallmarks";
import sheldonScale from "./articles/sheldon-scale";
import fourCs from "./articles/four-cs";
import blackOpal from "./articles/black-opal";
import mechanicalMovement from "./articles/mechanical-movement";
import goodDelivery from "./articles/good-delivery";
import clienteling from "./articles/clienteling";
import pearlCare from "./articles/pearl-care";
import aiInTheAtelier from "./articles/ai-in-the-atelier";

export * from "./types";

/**
 * The Journal's ordered article registry.
 *
 * Newest first. Adding an article means adding an import above and inserting
 * the reference in the position that reflects its publication date.
 */
export const ARTICLES: readonly Article[] = [
  hallmarks,
  sheldonScale,
  fourCs,
  blackOpal,
  mechanicalMovement,
  goodDelivery,
  clienteling,
  pearlCare,
  aiInTheAtelier,
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function articlesByCategory(category: JournalCategorySlug): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function articlesByTag(tag: string): Article[] {
  const t = tag.toLowerCase();
  return ARTICLES.filter((a) => a.tags.some((x) => x.toLowerCase() === t));
}

export function featuredArticle(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

export function editorsPicks(): Article[] {
  return ARTICLES.filter((a) => a.editorsPick);
}

export function relatedArticles(article: Article, limit = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== article.slug)
    .map((a) => {
      let score = 0;
      if (a.category === article.category) score += 3;
      score += a.tags.filter((t) => article.tags.includes(t)).length;
      return { a, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

export function allTags(): string[] {
  const set = new Set<string>();
  for (const a of ARTICLES) for (const t of a.tags) set.add(t);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
