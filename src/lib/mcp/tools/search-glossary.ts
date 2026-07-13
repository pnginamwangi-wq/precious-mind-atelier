import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { GLOSSARY } from "@/data/glossary";

export default defineTool({
  name: "search_glossary",
  title: "Search the Glossary",
  description:
    "Search the Academy's glossary of luxury and precious materials terminology. Returns matching entries with their definitions.",
  inputSchema: {
    query: z
      .string()
      .min(1)
      .describe("Term or fragment to search for (case insensitive, matches term or definition)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query.toLowerCase();
    const matches = GLOSSARY.filter(
      (g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q),
    ).slice(0, 30);
    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { entries: matches },
    };
  },
});
