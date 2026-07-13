import { defineTool } from "@lovable.dev/mcp-js";
import { LIBRARY } from "@/data/library";

export default defineTool({
  name: "list_library_items",
  title: "List Product Library items",
  description:
    "List reference objects in the Academy's Product Library (name, slug, summary). These are illustrative pieces used for study, not merchandise for sale.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = LIBRARY.map((i) => ({
      slug: i.slug,
      name: i.name,
      eyebrow: i.eyebrow,
      dek: i.dek,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});
