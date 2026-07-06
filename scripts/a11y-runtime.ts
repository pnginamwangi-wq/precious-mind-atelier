/**
 * Runtime WCAG AA scan of the running preview.
 *
 * Launches Playwright, walks each key route, and runs axe-core scoped to
 * color-contrast + focus + name rules. Exits non-zero on any violation.
 *
 * Requires the dev server on http://localhost:8080 (already running in the sandbox).
 * Run: bun scripts/a11y-runtime.ts
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/", "/institutes", "/institutes/gemstones", "/auth"];

// WCAG 2.1 AA rules only. color-contrast-enhanced is AAA and intentionally excluded.
const RULES = [
  "color-contrast",
  "button-name",
  "link-name",
  "aria-hidden-focus",
  "focus-order-semantics",
  "label",
  "image-alt",
];

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });
  let total = 0;
  try {
    for (const route of ROUTES) {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 1800 } });
      const page = await ctx.newPage();
      await page.goto(`http://localhost:8080${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);
      const results = await new AxeBuilder({ page })
        .options({ runOnly: { type: "rule", values: RULES } })
        .analyze();
      console.log(`\n== ${route} ==`);
      if (results.violations.length === 0) {
        console.log("  PASS  no violations");
      } else {
        for (const v of results.violations) {
          console.log(`  FAIL  [${v.impact}] ${v.id}: ${v.help}`);
          for (const n of v.nodes.slice(0, 5)) {
            console.log(`        target: ${n.target.join(" ")}`);
            if (n.failureSummary) {
              console.log(`        ${n.failureSummary.replace(/\n/g, " | ")}`);
            }
          }
        }
        total += results.violations.length;
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`\nTotal violations: ${total}`);
  if (total > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
