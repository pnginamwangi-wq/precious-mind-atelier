import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { LoupeRoomView, type LoupeWing } from "@/components/luxury/loupe-room-view";

const wingSchema = z.enum(["study", "bench", "hallmark-karat-lab"]).catch("study");

const searchSchema = z.object({
  wing: wingSchema.optional(),
});

export const Route = createFileRoute("/loupe-room/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "The Loupe Room, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Train your eye at the Academy's Loupe Room. Eight guided gemstone examination pathways, plus the Examination Bench where you read hallmarks, identify stones and detect suspicious pieces under a jeweller's loupe.",
      },
      { property: "og:title", content: "The Loupe Room, Precious Intelligence Academy" },
      {
        property: "og:description",
        content:
          "Guided gemstone examination pathways and an interactive examination bench for hallmarks and stones.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/loupe-room" }],
  }),
  component: LoupeRoomIndexPage,
});

function LoupeRoomIndexPage() {
  const { wing } = Route.useSearch();
  const navigate = useNavigate();
  const current: LoupeWing = wing ?? "study";

  const onWingChange = (next: LoupeWing) => {
    if (next === "hallmark-karat-lab") {
      void navigate({ to: "/loupe-room/hallmark-karat-lab", replace: true });
      return;
    }
    void navigate({
      to: "/loupe-room",
      search: { wing: next },
      replace: true,
    });
  };

  return <LoupeRoomView wing={current} onWingChange={onWingChange} />;
}
