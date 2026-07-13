import { defineTool } from "@lovable.dev/mcp-js";
import { INSTITUTES } from "@/data/institutes";

export default defineTool({
  name: "list_institutes",
  title: "List Institutes",
  description:
    "List the Academy's Institutes (disciplines of study), each with its slug, name, tag, overline, and short introduction.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = INSTITUTES.map((i) => ({
      slug: i.slug,
      n: i.n,
      name: i.name,
      tag: i.tag,
      overline: i.overline,
      intro: i.intro,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { institutes: items },
    };
  },
});
