import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getArticle } from "@/data/journal";

export default defineTool({
  name: "get_journal_article",
  title: "Get a Journal article",
  description:
    "Return the full body of a single Journal article by slug, including metadata and structured content blocks.",
  inputSchema: {
    slug: z.string().min(1).describe("Article slug, e.g. 'four-cs'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const article = getArticle(slug);
    if (!article) {
      return {
        content: [{ type: "text", text: `No article found for slug '${slug}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(article, null, 2) }],
      structuredContent: { article },
    };
  },
});
