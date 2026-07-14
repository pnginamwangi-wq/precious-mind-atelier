import { expect, test } from "@playwright/test";

type Case = {
  url: string;
  active: "study" | "bench" | "levels";
  expectedUrl?: RegExp;
};

const CASES: Case[] = [
  { url: "/loupe-room", active: "study", expectedUrl: /\/loupe-room(\?|$)/ },
  { url: "/loupe-room/study", active: "study" },
  { url: "/loupe-room/bench", active: "bench" },
  { url: "/loupe-room/levels", active: "levels" },
  // Query-parameter deep links on the index route
  { url: "/loupe-room?wing=study", active: "study" },
  { url: "/loupe-room?wing=bench", active: "bench" },
  { url: "/loupe-room?wing=levels", active: "levels" },
];

for (const c of CASES) {
  test(`highlights the ${c.active} tab when visiting ${c.url}`, async ({ page }) => {
    await page.goto(c.url);
    if (c.expectedUrl) {
      await expect(page).toHaveURL(c.expectedUrl);
    }

    const wings = ["study", "bench", "levels"] as const;
    for (const w of wings) {
      await expect(page.getByTestId(`loupe-tab-${w}`)).toHaveAttribute(
        "aria-selected",
        w === c.active ? "true" : "false",
      );
    }

    const frame = page.getByTestId("loupe-room-frame");
    await expect(frame).toHaveAttribute("data-wing", c.active);
    await expect(frame).toHaveAttribute("aria-labelledby", `loupe-tab-${c.active}`);
  });
}
