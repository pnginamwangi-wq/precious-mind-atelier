import { defineMcp } from "@lovable.dev/mcp-js";
import listJournalArticles from "./tools/list-journal-articles";
import getJournalArticle from "./tools/get-journal-article";
import listLibraryItems from "./tools/list-library-items";
import getLibraryItem from "./tools/get-library-item";
import listInstitutes from "./tools/list-institutes";
import getInstitute from "./tools/get-institute";
import searchGlossary from "./tools/search-glossary";

export default defineMcp({
  name: "precious-intelligence-academy-mcp",
  title: "The Precious Intelligence Academy",
  version: "0.1.0",
  instructions:
    "Read-only access to the Academy's public reference content: Journal articles, Product Library reference objects, Institutes (disciplines of study), and the terminology Glossary. Use these tools to answer questions about precious metals, bullion, coins, gemstones, jewellery, diamonds, horology, luxury retail, and related craft.",
  tools: [
    listJournalArticles,
    getJournalArticle,
    listLibraryItems,
    getLibraryItem,
    listInstitutes,
    getInstitute,
    searchGlossary,
  ],
});
