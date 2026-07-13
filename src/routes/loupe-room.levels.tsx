import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoupeRoomView, type LoupeWing } from "@/components/luxury/loupe-room-view";

export const Route = createFileRoute("/loupe-room/levels")({
  head: () => ({
    meta: [
      { title: "Loupe Room, Level Training, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Progressive levels ladder in the Loupe Room: earn your loupe, unlock harder examinations and prove your eye.",
      },
      {
        property: "og:title",
        content: "Loupe Room, Level Training, Precious Intelligence Academy",
      },
      {
        property: "og:description",
        content:
          "Climb the mastery ladder: progressive levels for gemstone examination under the jeweller's loupe.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/loupe-room/levels" }],
  }),
  component: LoupeRoomLevelsPage,
});

function LoupeRoomLevelsPage() {
  const navigate = useNavigate();

  const onWingChange = (next: LoupeWing) => {
    if (next === "levels") return;
    void navigate({
      to: "/loupe-room",
      search: { wing: next },
      replace: true,
    });
  };

  return <LoupeRoomView wing="levels" onWingChange={onWingChange} />;
}
