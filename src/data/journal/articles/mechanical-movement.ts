import type { Article } from "../types";

export const mechanicalMovement: Article = {
  slug: "anatomy-of-a-mechanical-movement",
  title: "Anatomy of a mechanical movement",
  dek: "A wristwatch is an argument about time made from a few hundred small metal parts. Learning where each one sits is the beginning of fluency in horology.",
  category: "luxury-watches",
  tags: ["horology", "watchmaking", "movements", "complications"],
  readingMinutes: 8,
  publishedAt: "2026-06-02",
  relatedInstitutes: ["horology"],
  relatedLibrary: ["mechanical-wristwatch"],
  body: [
    {
      kind: "paragraph",
      text: "The romance of a mechanical watch is that it needs no battery. Wind it, or wear it on an automatic rotor, and it will run for as long as its lubricants and its owner's patience last. The prose of a mechanical watch is that this feat is accomplished by five or six identifiable functional groups working together, and that knowing the groups by name is what allows a description to become a conversation.",
    },
    {
      kind: "heading",
      text: "The mainspring and barrel",
    },
    {
      kind: "paragraph",
      text: "Energy enters the movement through the crown or the automatic winding rotor and is stored in a mainspring coiled inside the barrel. The mainspring's tension is what drives everything else. Duration matters here: a movement's power reserve, quoted as 42 hours, 70 hours, or 10 days, describes how long the mainspring can drive the movement between winds, and it is one of the most useful specifications for a client to hold in mind.",
    },
    {
      kind: "heading",
      text: "The gear train",
    },
    {
      kind: "paragraph",
      text: "From the barrel, energy passes through a series of intermeshing wheels called the gear train. Each wheel steps the speed of rotation up and the torque down, moving the mainspring's slow, powerful unwinding towards the fast, delicate motion required at the escapement. The gear train ends at the escape wheel, the last wheel in the chain, and the point at which mechanical time meets its metronome.",
    },
    {
      kind: "heading",
      text: "The escapement and balance wheel",
    },
    {
      kind: "paragraph",
      text: "At the heart of a mechanical movement sits the escapement, most often a Swiss lever escapement, working with a balance wheel that oscillates back and forth several times a second. Each oscillation releases one tooth of the escape wheel, and each release becomes one tick. This is where a watch is regulated: the frequency of the balance, typically 4 Hz in modern movements, sets how finely the movement subdivides a second.",
    },
    {
      kind: "paragraph",
      text: "A well made escapement is what separates a movement that keeps time well from one that does not. A tourbillon rotates the entire escapement to average out the effect of gravity in different orientations, historically valuable for pocket watches. In a modern wristwatch the tourbillon is primarily a demonstration of craft.",
    },
    {
      kind: "heading",
      text: "The dial train and complications",
    },
    {
      kind: "paragraph",
      text: "A second set of gears, the dial train, converts the escapement's regular ticks into the motion visible on the dial: hours, minutes, seconds. Everything beyond that base motion is a complication. A date wheel, a chronograph, a moon phase, a perpetual calendar, a minute repeater. Each adds its own train of parts and its own vocabulary to the movement.",
    },
    {
      kind: "quote",
      text: "The escapement is where mechanical time meets its metronome. It is where a watch is truly regulated.",
    },
    {
      kind: "heading",
      text: "Finissage",
    },
    {
      kind: "paragraph",
      text: "The final layer is the least mechanical and the most visible. Finissage, the handwork applied to the movement, ranges from utilitarian to museum grade. Côtes de Genève on the bridges, anglage on the edges, black polish on the steel components, engraved lettering, blued screws: none of these makes the watch keep time better. All of them are the visible signature that a movement has been assembled by hand, and they are much of what distinguishes haute horlogerie from ordinary watchmaking.",
    },
    {
      kind: "heading",
      text: "How to speak about a movement",
    },
    {
      kind: "list",
      items: [
        "Give the movement a name and a family before describing complications.",
        "Quote power reserve, beat rate, and jewel count as three specifications a serious client will expect.",
        "Distinguish complications that solve a problem from complications that display craft. Both are valid.",
        "Treat finissage as an argument about care, not decoration. It is the maker's signature made visible.",
      ],
    },
  ],
};

export default mechanicalMovement;
