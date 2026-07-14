import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoupeRoomView, type LoupeWing } from "@/components/luxury/loupe-room-view";

export const Route = createFileRoute("/loupe-room/hallmark-karat-lab")({
  head: () => ({
    meta: [
      { title: "Loupe Room, The Hallmark & Karat Lab, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Train your eye to recognise hallmarks, karat standards, metal fineness, gemstones and common jewellery issues through interactive visual challenges.",
      },
      {
        property: "og:title",
        content: "Loupe Room, The Hallmark & Karat Lab, Precious Intelligence Academy",
      },
      {
        property: "og:description",
        content:
          "Train your eye to recognise hallmarks, karat standards, metal fineness, gemstones and common jewellery issues through interactive visual challenges.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/loupe-room/hallmark-karat-lab" }],
  }),
  component: HallmarkKaratLabPage,
});

function HallmarkKaratLabPage() {
  const navigate = useNavigate();

  const onWingChange = (next: LoupeWing) => {
    if (next === "hallmark-karat-lab") return;
    void navigate({
      to: "/loupe-room",
      search: { wing: next },
      replace: true,
    });
  };

  return <LoupeRoomView wing="hallmark-karat-lab" onWingChange={onWingChange} />;
}
