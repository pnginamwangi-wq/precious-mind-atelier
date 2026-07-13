import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ARTICLES } from "@/data/journal";

export default defineTool({
  name: "list_journal_articles",
  title: "List Journal articles",
  description:
    "List published articles in The Journal (title, slug, dek, category, tags, reading minutes, published date). Optionally filter by category slug or tag.",
  inputSchema: {
    category: z.string().optional().describe("Optional category slug filter, e.g. 'gemstones'."),
    tag: z.string().optional().describe("Optional tag filter (exact match, case insensitive)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, tag }) => {
    const tagLower = tag?.toLowerCase();
    const items = ARTICLES.filter((a) => {
      if (category && a.category !== category) return false;
      if (tagLower && !a.tags.some((t) => t.toLowerCase() === tagLower)) return false;
      return true;
    }).map((a) => ({
      slug: a.slug,
      title: a.title,
      dek: a.dek,
      category: a.category,
      tags: a.tags,
      readingMinutes: a.readingMinutes,
      publishedAt: a.publishedAt,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { articles: items },
    };
  },
});
