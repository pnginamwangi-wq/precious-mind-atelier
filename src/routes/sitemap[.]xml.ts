import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { INSTITUTES, chapterSlug } from "@/data/institutes";
import { ARTICLES, JOURNAL_CATEGORIES } from "@/data/journal";
import { LIBRARY } from "@/data/library";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/institutes", changefreq: "weekly", priority: "0.9" },
          { path: "/journal", changefreq: "weekly", priority: "0.9" },
          { path: "/knowledge", changefreq: "weekly", priority: "0.8" },
          { path: "/knowledge/glossary", changefreq: "monthly", priority: "0.6" },
          { path: "/knowledge/pathways", changefreq: "monthly", priority: "0.6" },
          { path: "/knowledge/compare", changefreq: "monthly", priority: "0.6" },
          { path: "/library", changefreq: "weekly", priority: "0.8" },
          { path: "/smelt-lab", changefreq: "monthly", priority: "0.8" },
          { path: "/governance", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "monthly", priority: "0.3" },
          { path: "/terms", changefreq: "monthly", priority: "0.3" },
        ];

        for (const it of INSTITUTES) {
          entries.push({
            path: `/institutes/${it.slug}`,
            changefreq: "monthly",
            priority: "0.8",
          });
          for (const module of it.curriculum) {
            entries.push({
              path: `/institutes/${it.slug}/chapters/${chapterSlug(module.chapter)}`,
              changefreq: "monthly",
              priority: "0.6",
            });
          }
        }

        for (const a of ARTICLES) {
          entries.push({
            path: `/journal/${a.slug}`,
            changefreq: "monthly",
            priority: "0.7",
          });
        }

        for (const c of JOURNAL_CATEGORIES) {
          entries.push({
            path: `/journal/category/${c.slug}`,
            changefreq: "weekly",
            priority: "0.5",
          });
        }

        for (const l of LIBRARY) {
          entries.push({
            path: `/library/${l.slug}`,
            changefreq: "monthly",
            priority: "0.7",
          });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
