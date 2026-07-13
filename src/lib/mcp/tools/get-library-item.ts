import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getLibraryItem } from "@/data/library";

export default defineTool({
  name: "get_library_item",
  title: "Get a Product Library item",
  description:
    "Return the full description of a single Product Library item by slug, including specifications and educational notes.",
  inputSchema: {
    slug: z.string().min(1).describe("Library item slug, e.g. 'gold-bar'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const item = getLibraryItem(slug);
    if (!item) {
      return {
        content: [{ type: "text", text: `No library item found for slug '${slug}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(item, null, 2) }],
      structuredContent: { item },
    };
  },
});
