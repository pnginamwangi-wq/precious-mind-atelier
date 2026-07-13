import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoupeRoomView, type LoupeWing } from "@/components/luxury/loupe-room-view";

export const Route = createFileRoute("/loupe-room/study")({
  head: () => ({
    meta: [
      { title: "Loupe Room, Study Pathways, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Eight guided gemstone examination pathways under the jeweller's loupe. Train your eye with the Academy's Study wing.",
      },
      {
        property: "og:title",
        content: "Loupe Room, Study Pathways, Precious Intelligence Academy",
      },
      {
        property: "og:description",
        content:
          "Guided gemstone examination pathways under the jeweller's loupe.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/loupe-room/study" }],
  }),
  component: LoupeRoomStudyPage,
});

function LoupeRoomStudyPage() {
  const navigate = useNavigate();

  const onWingChange = (next: LoupeWing) => {
    if (next === "study") return;
    if (next === "levels") {
      void navigate({ to: "/loupe-room/levels", replace: true });
      return;
    }
    if (next === "bench") {
      void navigate({ to: "/loupe-room/bench", replace: true });
      return;
    }
  };

  return <LoupeRoomView wing="study" onWingChange={onWingChange} />;
}
