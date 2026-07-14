import { expect, test } from "@playwright/test";

type WingMeta = {
  path: string;
  canonical: string;
  titleRe: RegExp;
  ogTitleRe: RegExp;
  ogDescriptionRe: RegExp;
};

const WINGS: WingMeta[] = [
  {
    path: "/loupe-room",
    canonical: "/loupe-room",
    titleRe: /The Loupe Room, Precious Intelligence Academy/i,
    ogTitleRe: /The Loupe Room, Precious Intelligence Academy/i,
    ogDescriptionRe: /guided gemstone examination pathways/i,
  },
  {
    path: "/loupe-room/study",
    canonical: "/loupe-room/study",
    titleRe: /Loupe Room, Study Pathways/i,
    ogTitleRe: /Study Pathways/i,
    ogDescriptionRe: /guided gemstone examination pathways/i,
  },
  {
    path: "/loupe-room/bench",
    canonical: "/loupe-room/bench",
    titleRe: /Loupe Room, Examination Bench/i,
    ogTitleRe: /Examination Bench/i,
    ogDescriptionRe: /examination bench/i,
  },
  {
    path: "/loupe-room/levels",
    canonical: "/loupe-room/levels",
    titleRe: /Loupe Room, Level Training/i,
    ogTitleRe: /Level Training/i,
    ogDescriptionRe: /mastery ladder|progressive levels/i,
  },
];

for (const wing of WINGS) {
  test.describe(`Loupe Room meta at ${wing.path}`, () => {
    test("title, canonical, and Open Graph tags are correct", async ({ page }) => {
      await page.goto(wing.path);

      await expect(page).toHaveTitle(wing.titleRe);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute("href", wing.canonical);

      const ogTitle = page.locator('meta[property="og:title"]');
      const ogDescription = page.locator('meta[property="og:description"]');
      const ogType = page.locator('meta[property="og:type"]').first();

      await expect(ogTitle).toHaveAttribute("content", wing.ogTitleRe);
      await expect(ogDescription).toHaveAttribute("content", wing.ogDescriptionRe);
      await expect(ogType).toHaveAttribute("content", "website");
    });
  });
}
