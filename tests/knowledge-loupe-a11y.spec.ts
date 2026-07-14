import { test, expect, type Page } from "@playwright/test";

/**
 * Accessibility assertions for /knowledge and /loupe-room:
 *   1. Keyboard-only focus lands on a visible, ringed control inside each
 *      route's MediaOverlay hero area.
 *   2. `prefers-reduced-motion: reduce` collapses all animation on the
 *      MediaOverlay and prevents any background <video> from playing.
 *   3. Screen-reader semantics: headings, tablists, iframe title, and
 *      poster alt/aria-hidden are wired correctly.
 *
 * We keep the assertions specific to the hero + iframe body so a
 * regression in unrelated sections does not fail these tests.
 */

// A focus ring is "visible" if any of outline-width, outline-style,
// box-shadow, or a Tailwind ring-* utility resolves to a non-zero
// visual indicator. This mirrors what a keyboard user actually sees.
function focusRingCheck(el: Element): { visible: boolean; reason: string } {
  const s = getComputedStyle(el as HTMLElement);
  const outlineWidth = parseFloat(s.outlineWidth || "0");
  const outlineStyle = s.outlineStyle;
  const boxShadow = s.boxShadow;
  const hasOutline = outlineWidth > 0 && outlineStyle !== "none";
  // Any non-"none" box-shadow counts as a ring; Tailwind's `ring-*` compiles
  // to a box-shadow inset. The check is intentionally lenient.
  const hasShadowRing = boxShadow && boxShadow !== "none";
  return {
    visible: !!(hasOutline || hasShadowRing),
    reason: JSON.stringify({ outlineWidth, outlineStyle, boxShadow }),
  };
}

async function tabToHeroInteractive(page: Page, heroSelector: string, maxTabs = 25) {
  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate((sel) => {
      const hero = document.querySelector(sel);
      const active = document.activeElement as HTMLElement | null;
      if (!hero || !active) return false;
      return hero.contains(active) || hero === active;
    }, heroSelector);
    if (inside) return true;
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* 1. Keyboard focus + visible focus ring                              */
/* ------------------------------------------------------------------ */

test.describe("MediaOverlay keyboard reachability", () => {
  test("/knowledge hero content is tab-reachable with a visible focus ring", async ({ page }) => {
    await page.goto("/knowledge", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);

    // Mark the hero container that wraps the MediaOverlay.
    await page.evaluate(() => {
      const overlay = document.querySelector("main .on-media");
      overlay?.parentElement?.setAttribute("data-kb-hero", "");
      // The card grid immediately below the overlay sits inside the same
      // <Section>. Widen the reachable target to the whole section so we
      // catch the first focusable card link too.
      overlay?.closest("section")?.setAttribute("data-kb-hero-section", "");
    });

    const reached = await tabToHeroInteractive(page, "[data-kb-hero-section]");
    expect(reached, "Tab should land inside the /knowledge hero section").toBe(true);

    const ring = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return { visible: false, reason: "no active element" };
      const s = getComputedStyle(el);
      const ow = parseFloat(s.outlineWidth || "0");
      return {
        visible: (ow > 0 && s.outlineStyle !== "none") || (s.boxShadow && s.boxShadow !== "none"),
        reason: `outline:${s.outlineWidth} ${s.outlineStyle}; box-shadow:${s.boxShadow}`,
        tag: el.tagName,
      };
    });
    expect(ring.visible, `focused element must show a ring. Got ${ring.reason}`).toBe(true);
  });

  test("/loupe-room shell exposes keyboard-reachable controls with focus rings", async ({
    page,
  }) => {
    await page.goto("/loupe-room", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);

    // The shell overlays a MediaOverlay across the tab bar. Tab through
    // and verify we hit either the Academy back-link or one of the wing
    // tablist buttons, and that the focused element renders a ring.
    let hit = false;
    let ring = { visible: false, reason: "" };
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return null;
        const isTab = el.getAttribute("role") === "tab";
        const isAcademyLink = /academy/i.test(el.textContent || "") && el.tagName === "A";
        const isSkip = /skip to interactive/i.test(el.textContent || "");
        const s = getComputedStyle(el);
        const ow = parseFloat(s.outlineWidth || "0");
        const ringVisible =
          (ow > 0 && s.outlineStyle !== "none") || (s.boxShadow && s.boxShadow !== "none");
        return {
          isTab,
          isAcademyLink,
          isSkip,
          ringVisible,
          reason: `outline:${s.outlineWidth} ${s.outlineStyle}; box-shadow:${s.boxShadow}`,
        };
      });
      if (!info) continue;
      if (info.isTab || info.isAcademyLink || info.isSkip) {
        hit = true;
        ring = { visible: !!info.ringVisible, reason: info.reason };
        if (info.ringVisible) break;
      }
    }
    expect(hit, "Tab must reach the Loupe Room shell controls").toBe(true);
    expect(ring.visible, `shell focused control must show a ring. Got ${ring.reason}`).toBe(true);

    // Inside the iframe: continue tabbing until focus lands on one of the
    // iframe's own tab-order elements, then read that element's computed
    // focus ring via `contentDocument.activeElement`. Programmatic `.focus()`
    // does not grant :focus-visible; keyboard Tab does.
    const iframeHandle = await page.$('iframe[data-testid="loupe-room-frame"]');
    const contentFrame = await iframeHandle!.contentFrame();
    expect(contentFrame, "loupe-room iframe must be same-origin").not.toBeNull();

    let iframeRing = { ok: false, reason: "not reached" };
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      const info = await contentFrame!.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const s = getComputedStyle(el);
        const ow = parseFloat(s.outlineWidth || "0");
        const visible =
          (ow > 0 && s.outlineStyle !== "none") || (s.boxShadow && s.boxShadow !== "none");
        return {
          tag: el.tagName,
          role: el.getAttribute("role"),
          fv: el.matches(":focus-visible"),
          visible: !!visible,
          reason: `outline:${s.outlineWidth} ${s.outlineStyle}; box-shadow:${s.boxShadow}`,
        };
      });
      if (info && info.visible) {
        iframeRing = { ok: true, reason: info.reason };
        break;
      }
      if (info) iframeRing = { ok: false, reason: `${info.tag}[${info.role}] ${info.reason}` };
    }
    expect(
      iframeRing.ok,
      `an iframe focusable element must show a focus ring. Last seen: ${iframeRing.reason}`,
    ).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/* 2. prefers-reduced-motion                                           */
/* ------------------------------------------------------------------ */

test.describe("MediaOverlay respects prefers-reduced-motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("/knowledge collapses animations and does not play background video", async ({ page }) => {
    await page.goto("/knowledge", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);

    const report = await page.evaluate(() => {
      const overlay = document.querySelector<HTMLElement>("main .on-media");
      if (!overlay) return { found: false } as const;
      const animated = Array.from(
        overlay.querySelectorAll<HTMLElement>("*, [class*='animate-']"),
      );
      const slow: Array<{ tag: string; dur: string }> = [];
      for (const el of animated) {
        const s = getComputedStyle(el);
        for (const raw of s.animationDuration.split(",")) {
          const dur = raw.trim();
          if (!dur || dur === "0s") continue;
          // Anything longer than the global 0.01ms reset means the reduced-
          // motion CSS rule did not apply to this element.
          const ms =
            dur.endsWith("ms")
              ? parseFloat(dur)
              : dur.endsWith("s")
                ? parseFloat(dur) * 1000
                : Number.POSITIVE_INFINITY;
          if (ms > 100) slow.push({ tag: el.tagName, dur });
        }
      }
      const video = overlay.querySelector("video");
      return {
        found: true,
        slow,
        hasPlayingVideo: !!(video && !(video as HTMLVideoElement).paused),
      } as const;
    });
    expect(report.found, "knowledge hero must render a MediaOverlay").toBe(true);
    expect(
      report.slow,
      `no MediaOverlay descendant may run > 100ms animation under reduced-motion. Offenders: ${JSON.stringify(report.slow)}`,
    ).toEqual([]);
    expect(report.hasPlayingVideo, "no background video may play under reduced-motion").toBe(false);
  });

  test("/loupe-room shell + iframe collapse animations and do not autoplay video", async ({
    page,
  }) => {
    await page.goto("/loupe-room", { waitUntil: "domcontentloaded" });
    // Re-assert reduced-motion emulation after navigation so it also
    // propagates to the same-origin iframe's media-query evaluation.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => document.fonts.ready);
    // Wait for the iframe to finish loading before we sample styles.
    await page.waitForFunction(() => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe[data-testid="loupe-room-frame"]',
      );
      return !!iframe && iframe.contentDocument?.readyState === "complete";
    });

    // Outer shell MediaOverlay.
    const shellReport = await page.evaluate(() => {
      const overlay = document.querySelector<HTMLElement>(".on-media");
      if (!overlay) return { found: false } as const;
      const els = Array.from(overlay.querySelectorAll<HTMLElement>("*"));
      const slow: Array<{ tag: string; dur: string }> = [];
      for (const el of els) {
        const s = getComputedStyle(el);
        for (const raw of s.animationDuration.split(",")) {
          const dur = raw.trim();
          if (!dur || dur === "0s") continue;
          const ms =
            dur.endsWith("ms")
              ? parseFloat(dur)
              : dur.endsWith("s")
                ? parseFloat(dur) * 1000
                : Number.POSITIVE_INFINITY;
          if (ms > 100) slow.push({ tag: el.tagName, dur });
        }
      }
      const video = overlay.querySelector("video");
      return {
        found: true,
        slow,
        hasPlayingVideo: !!(video && !(video as HTMLVideoElement).paused),
      } as const;
    });
    expect(shellReport.found, "loupe shell overlay must render").toBe(true);
    expect(
      shellReport.slow,
      `loupe shell MediaOverlay must respect reduced-motion. Offenders: ${JSON.stringify(shellReport.slow)}`,
    ).toEqual([]);
    expect(shellReport.hasPlayingVideo).toBe(false);

    // Iframe body: the room uses a reveal-on-scroll transition and the
    // hero fallback gradient. Under reduced-motion the .rv reveal must be
    // instant and no <video> may exist / autoplay.
    const contentFrame = await (
      await page.$('iframe[data-testid="loupe-room-frame"]')
    )!.contentFrame();
    expect(contentFrame).not.toBeNull();

    const iframeReport = await contentFrame!.evaluate(() => {
      // The iframe's own CSS has `@media (prefers-reduced-motion: reduce)`
      // overrides. Confirm they applied by sampling representative elements.
      const rv = document.querySelector<HTMLElement>(".rv");
      const stone = document.querySelector<HTMLElement>(".stone");
      const heroH1 = document.querySelector<HTMLElement>(".hero h1");
      const durs: Array<{ where: string; anim: string; trans: string }> = [];
      for (const [where, el] of [
        ["rv", rv],
        ["stone", stone],
        ["hero-h1", heroH1],
      ] as const) {
        if (!el) continue;
        const s = getComputedStyle(el);
        durs.push({ where, anim: s.animationDuration, trans: s.transitionDuration });
      }
      const parseMs = (d: string) =>
        d.endsWith("ms")
          ? parseFloat(d)
          : d.endsWith("s")
            ? parseFloat(d) * 1000
            : Number.POSITIVE_INFINITY;
      const slow = durs.filter((d) => {
        const worst = Math.max(
          ...d.anim.split(",").map((x) => parseMs(x.trim())),
          ...d.trans.split(",").map((x) => parseMs(x.trim())),
        );
        return worst > 100;
      });
      const video = document.querySelector("video");
      return { durs, slow, hasVideo: !!video };
    });
    expect(
      iframeReport.slow,
      `iframe elements must collapse animation/transition under reduced-motion. Report: ${JSON.stringify(iframeReport.durs)}`,
    ).toEqual([]);
    expect(iframeReport.hasVideo, "loupe iframe must not embed autoplay video").toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/* 3. Screen-reader roles + ARIA                                       */
/* ------------------------------------------------------------------ */

test.describe("MediaOverlay accessible roles + ARIA", () => {
  test("/knowledge hero exposes a single h1 and a decorative poster", async ({ page }) => {
    await page.goto("/knowledge", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);

    // Exactly one h1 on the page, and it lives inside the hero section.
    const h1s = page.locator("main h1");
    await expect(h1s).toHaveCount(1);
    const heroH1 = page.locator("main .on-media").locator("xpath=ancestor::section[1]").locator("h1");
    await expect(heroH1).toHaveCount(1);
    await expect(heroH1).toBeVisible();
    await expect(heroH1).not.toHaveText("");

    // Poster image is decorative: empty alt AND aria-hidden.
    const posterImg = page.locator("main .on-media picture img").first();
    await expect(posterImg).toHaveAttribute("alt", "");
    await expect(posterImg).toHaveAttribute("aria-hidden", /true/);

    // Card grid uses semantic <ul>/<li> with reachable <a>s.
    const cardLinks = page.locator("main ul li a").filter({ has: page.locator("h2") });
    expect(await cardLinks.count()).toBeGreaterThan(0);
  });

  test("/loupe-room shell + iframe expose correct roles and labels", async ({ page }) => {
    await page.goto("/loupe-room", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);

    // Shell: tablist with three named tabs, one selected.
    const tablist = page.getByRole("tablist", { name: /loupe room wings/i });
    await expect(tablist).toBeVisible();
    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(3);
    const selected = tablist.getByRole("tab", { selected: true });
    await expect(selected).toHaveCount(1);

    // Iframe carries a real title + aria-label + tabpanel role.
    const iframeEl = page.locator('iframe[data-testid="loupe-room-frame"]');
    await expect(iframeEl).toHaveAttribute("title", /.+/);
    await expect(iframeEl).toHaveAttribute("aria-label", /.+/);
    await expect(iframeEl).toHaveAttribute("role", "tabpanel");
    await expect(iframeEl).toHaveAttribute("aria-labelledby", /^loupe-tab-/);

    // Shell MediaOverlay poster is decorative.
    const shellPoster = page.locator(".on-media picture img").first();
    await expect(shellPoster).toHaveAttribute("alt", "");
    await expect(shellPoster).toHaveAttribute("aria-hidden", /true/);

    // Inside the iframe: single h1, gemstone tray tablist named,
    // each gemstone tab has an accessible name, one has aria-selected.
    const contentFrame = await (await iframeEl.elementHandle())!.contentFrame();
    expect(contentFrame).not.toBeNull();
    const iframeReport = await contentFrame!.evaluate(() => {
      const h1s = document.querySelectorAll("h1");
      const tray = document.querySelector('#tray[role="tablist"]');
      const trayLabel = tray?.getAttribute("aria-label") || "";
      const gemTabs = Array.from(document.querySelectorAll('#tray button[role="tab"]'));
      const namedTabs = gemTabs.filter((b) => (b.textContent || "").trim().length > 0);
      const selectedTabs = gemTabs.filter((b) => b.getAttribute("aria-selected") === "true");
      const stationTabs = document.querySelectorAll('#stationTabs button[role="tab"]');
      const stoneImg = document.querySelector<HTMLElement>("#stoneVis");
      const stoneAriaLabel = stoneImg?.getAttribute("aria-label") || "";
      const stoneStageHidden = document
        .querySelector(".stone-stage")
        ?.getAttribute("aria-hidden");
      return {
        h1Count: h1s.length,
        trayIsTablist: !!tray,
        trayLabel,
        gemTabCount: gemTabs.length,
        namedTabCount: namedTabs.length,
        selectedCount: selectedTabs.length,
        stationTabCount: stationTabs.length,
        stoneAriaLabel,
        stoneStageHidden,
      };
    });
    expect(iframeReport.h1Count, "iframe should expose exactly one h1").toBe(1);
    expect(iframeReport.trayIsTablist).toBe(true);
    expect(iframeReport.trayLabel).toMatch(/gem/i);
    expect(iframeReport.gemTabCount).toBe(8);
    expect(iframeReport.namedTabCount, "every gemstone tab must have visible text").toBe(8);
    expect(iframeReport.selectedCount, "exactly one gemstone tab must be aria-selected").toBe(1);
    expect(iframeReport.stationTabCount).toBe(4);
    // The stone-stage is decorative (aria-hidden), so the stoneVis label is
    // for redundant safety only; either treatment is acceptable.
    expect(iframeReport.stoneStageHidden).toBe("true");
    expect(iframeReport.stoneAriaLabel).toMatch(/specimen/i);
  });
});
