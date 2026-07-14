import { test, expect } from "@playwright/test";

/**
 * Fails if any key route logs a console error or an unexpected warning.
 *
 * `ALLOWED_WARNINGS` is the current baseline of known, pre-existing
 * warnings, one regex per entry. Anything not matched fails the test.
 * Add a new entry only with an inline comment justifying the exemption.
 */

const ROUTES = ["/", "/library", "/institutes", "/journal", "/knowledge", "/smelt-lab", "/loupe-room"] as const;

const ALLOWED_WARNINGS: RegExp[] = [
  // Dev-only source-mapping attribute (data-tsd-source) injected by the
  // tooling on __root.tsx. Line numbers differ between SSR and client
  // renders. Not caused by app code and not user visible.
  /data-tsd-source/i,
  /A tree hydrated but some attributes of the server rendered HTML didn't match/i,
  // Sandboxed iframes on /smelt-lab and /loupe-room legitimately need
  // both allow-scripts and allow-same-origin so the wing HTML can talk
  // to sessionStorage. Browsers log this as a generic warning.
  /iframe which has both allow-scripts and allow-same-origin/i,
];

const ALLOWED_ERRORS: RegExp[] = [
  // React logs the hydration mismatch through console.error too; the
  // underlying cause is the same tooling attribute above.
  /A tree hydrated but some attributes of the server rendered HTML didn't match/i,
  /data-tsd-source/i,
];

for (const path of ROUTES) {
  test(`no unexpected console errors or warnings on ${path}`, async ({ page }) => {
    const messages: Array<{ type: string; text: string }> = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") {
        messages.push({ type: m.type(), text: m.text() });
      }
    });
    page.on("pageerror", (err) => {
      messages.push({ type: "pageerror", text: err.message });
    });

    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const unexpected = messages.filter((m) => {
      const list = m.type === "warning" ? ALLOWED_WARNINGS : ALLOWED_ERRORS;
      return !list.some((r) => r.test(m.text));
    });

    expect(
      unexpected,
      `Unexpected console output on ${path}:\n${unexpected
        .map((m) => `  [${m.type}] ${m.text}`)
        .join("\n")}`,
    ).toEqual([]);
  });
}
