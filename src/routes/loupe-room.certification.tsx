import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoupeRoomView, type LoupeWing } from "@/components/luxury/loupe-room-view";

export const Route = createFileRoute("/loupe-room/certification")({
  head: () => ({
    meta: [
      { title: "Loupe Room, Certification Wing, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Earn your certified eye in the Loupe Room: pass four levels of hallmark and gemstone examination under a jeweller's loupe and receive your certificate.",
      },
      {
        property: "og:title",
        content: "Loupe Room, Certification Wing, Precious Intelligence Academy",
      },
      {
        property: "og:description",
        content:
          "Four levels of examination under the loupe. Pass each to unlock the next and earn your certified eye.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/loupe-room/certification" }],
  }),
  component: LoupeRoomCertificationPage,
});

function LoupeRoomCertificationPage() {
  const navigate = useNavigate();

  const onWingChange = (next: LoupeWing) => {
    if (next === "certification") return;
    void navigate({
      to: "/loupe-room",
      search: { wing: next },
      replace: true,
    });
  };

  return <LoupeRoomView wing="certification" onWingChange={onWingChange} />;
}
