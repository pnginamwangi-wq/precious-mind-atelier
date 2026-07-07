import type { LibraryItem } from "./types";
import goldBar from "./gold-bar";
import silverBar from "./silver-bar";
import goldCoin from "./gold-coin";
import blackOpal from "./black-opal";
import diamondSolitaireRing from "./diamond-solitaire-ring";
import southSeaPearlNecklace from "./south-sea-pearl-necklace";
import mechanicalWristwatch from "./mechanical-wristwatch";

export * from "./types";

export const LIBRARY: readonly LibraryItem[] = [
  goldBar,
  silverBar,
  goldCoin,
  blackOpal,
  diamondSolitaireRing,
  southSeaPearlNecklace,
  mechanicalWristwatch,
];

export function getLibraryItem(slug: string): LibraryItem | undefined {
  return LIBRARY.find((i) => i.slug === slug);
}
