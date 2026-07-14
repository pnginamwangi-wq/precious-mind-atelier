import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoupeRoomView, type LoupeWing } from "@/components/luxury/loupe-room-view";

export const Route = createFileRoute("/loupe-room/bench")({
  head: () => ({
    meta: [
      { title: "Loupe Room, Examination Bench, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Read hallmarks, identify stones and detect suspicious pieces under the jeweller's loupe at the Academy's Examination Bench.",
      },
      {
        property: "og:title",
        content: "Loupe Room, Examination Bench, Precious Intelligence Academy",
      },
      {
        property: "og:description",
        content:
          "Interactive examination bench for hallmarks, stones and suspicious pieces.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/loupe-room/bench" }],
  }),
  component: LoupeRoomBenchPage,
});

function LoupeRoomBenchPage() {
  const navigate = useNavigate();

  const onWingChange = (next: LoupeWing) => {
    if (next === "bench") return;
    if (next === "hallmark-karat-lab") {
      void navigate({ to: "/loupe-room/hallmark-karat-lab", replace: true });
      return;
    }
    if (next === "study") {
      void navigate({ to: "/loupe-room/study", replace: true });
      return;
    }
  };

  return <LoupeRoomView wing="bench" onWingChange={onWingChange} />;
}
