import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { INSTITUTES } from "@/data/institutes";

export default defineTool({
  name: "get_institute",
  title: "Get an Institute",
  description:
    "Return the full public description of an Institute by slug, including philosophy, curriculum outline, practitioner roles, and outcomes.",
  inputSchema: {
    slug: z.string().min(1).describe("Institute slug, e.g. 'gemstones'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const institute = INSTITUTES.find((i) => i.slug === slug);
    if (!institute) {
      return {
        content: [{ type: "text", text: `No Institute found for slug '${slug}'.` }],
        isError: true,
      };
    }
    // Omit imported image binding from the payload.
    const { hero: _hero, ...rest } = institute;
    return {
      content: [{ type: "text", text: JSON.stringify(rest, null, 2) }],
      structuredContent: { institute: rest },
    };
  },
});
