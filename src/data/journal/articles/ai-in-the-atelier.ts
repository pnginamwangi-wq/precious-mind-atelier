import type { Article } from "../types";

export const aiInTheAtelier: Article = {
  slug: "ai-in-the-atelier",
  title: "AI in the atelier",
  dek: "Artificial intelligence will not replace the hand of the master jeweller. Used well, it can save that hand from the parts of the work it should never have been doing.",
  category: "artificial-intelligence",
  tags: ["AI", "ateliers", "craft", "governance"],
  readingMinutes: 8,
  publishedAt: "2026-05-05",
  editorsPick: true,
  featured: true,
  relatedInstitutes: ["artificial-intelligence", "jewellery"],
  body: [
    {
      kind: "paragraph",
      text: "Every luxury house that has looked seriously at artificial intelligence has arrived at roughly the same conclusion. The parts of the work that make a house a house, the taste, the hand, the accumulated judgement of decades, are not the parts that AI is good at. The parts of the work that quietly slow a house down, the retrieval of past drawings, the tagging of images, the transcription of client notes, the search across an archive nobody had time to index, are the parts that AI is unusually well suited to.",
    },
    {
      kind: "heading",
      text: "A tool for retrieval",
    },
    {
      kind: "paragraph",
      text: "The oldest ateliers are archives. Sketches, gouaches, workshop photographs, client correspondence, sample stones, mould drawings, invoices to and from suppliers. Very little of this material has ever been searchable in the way a modern person expects. A senior craftsperson remembers where things are; a new hire does not. Modern retrieval systems, especially those combining text and image search, can convert a decades old physical archive into something a designer can query in minutes.",
    },
    {
      kind: "paragraph",
      text: "The gain here is not in creativity. It is in access. When a designer can look at every past treatment of a floral motif in the house archive in the time it used to take to find one, the design conversation moves faster and stays deeper. That is the honest case for AI in the atelier.",
    },
    {
      kind: "heading",
      text: "A tool for authenticity",
    },
    {
      kind: "paragraph",
      text: "Vision models, trained on catalogued pieces from a specific maker, can flag features on an incoming piece that are inconsistent with the maker's known practice. This is not a substitute for the eye of an expert. It is a filter that surfaces the pieces that most warrant an expert's attention. Used correctly, it lets a small team of specialists cover more ground than would otherwise be possible.",
    },
    {
      kind: "paragraph",
      text: "The failure mode is well known. A model that says a piece is inconsistent with a maker's practice is not saying the piece is fake. It is saying that a statistical judgement, made against a specific training set, produced a particular score. Treating that score as a verdict is where a house gets itself into trouble.",
    },
    {
      kind: "heading",
      text: "Governance, not enthusiasm",
    },
    {
      kind: "paragraph",
      text: "The core question a luxury house should ask before deploying an AI tool is not whether the tool works. It is who has access to the data the tool needs to work. Client information, unfinished designs, workshop photographs, appraisal notes: these are among the most confidential assets in the industry. Any AI programme that touches them requires the same governance a house would apply to a physical vault.",
    },
    {
      kind: "paragraph",
      text: "That includes where data is stored, who trained the model, whether third parties see the data during use, and what happens to the data if the vendor changes. These are not technical questions. They are questions of stewardship, and they belong on the same list as insurance and provenance.",
    },
    {
      kind: "quote",
      text: "The parts of the work that make a house a house are not the parts that AI is good at.",
    },
    {
      kind: "heading",
      text: "For the director",
    },
    {
      kind: "list",
      items: [
        "Adopt AI where it saves the hand of the master, not where it replaces it.",
        "Prefer tools that read your archive to tools that generate new work you did not ask for.",
        "Treat any model's output as a considered opinion, never a verdict.",
        "Apply the same governance to AI vendors that you apply to any other supplier that touches confidential material.",
      ],
    },
  ],
};

export default aiInTheAtelier;
