/**
 * Institute of Gemstones — full lesson content.
 *
 * Written under the same Governance Charter constraints as the other
 * Institutes: no fabricated statistics, no named living individuals, and
 * any named laboratory, grading body, or certification scheme is referenced
 * only as public industry fact, never as an implied partner or affiliate
 * of the Academy. Gemmological opinions expressed here are educational and
 * do not substitute for a formal laboratory report on a specific stone.
 */

import type { ChapterContent } from "./types";

const gemstonesCurriculum: ChapterContent[] = [
  {
    chapter: "I",
    reading: [
      {
        heading: "Four words, one judgement",
        paragraphs: [
          "Colour, clarity, cut, and carat are usually taught as a consumer mnemonic. A director needs the wholesaler's version: each C is not a fact about a stone but a judgement made against a moving reference, and the four judgements interact rather than add up neatly. A large, clean, poorly cut diamond can be worth less than a smaller, better proportioned one, because cut governs how the other three are ever seen at all.",
          "Colour is graded on a scale running from colourless toward increasing yellow or brown, assessed under controlled lighting against master stones. Clarity is graded by the visibility of inclusions and blemishes under ten times magnification, not the naked eye. Carat is simply mass, one fifth of a gram, and matters commercially because larger rough is rarer relative to demand, not because it is intrinsically superior.",
        ],
      },
      {
        heading: "Cut as the hidden variable",
        paragraphs: [
          "Cut is graded on proportion, symmetry, and polish, and it determines how efficiently a stone returns light to the eye. Two diamonds of identical colour and clarity grade can look markedly different once cut quality diverges, because a shallow or overly deep cut leaks light out the sides or bottom rather than back through the crown. This is the C a buyer notices first and understands least.",
          "A director's job is to translate a laboratory report's numeric proportions into what a client will actually see across a boutique table: brightness, fire, and scintillation. Reading a report fluently, and being able to say plainly why two stones with similar grades perform differently in the hand, is the actual skill this chapter builds.",
        ],
      },
      {
        heading: "Reports, not opinions",
        paragraphs: [
          "Independent gemmological laboratories issue reports describing a stone's characteristics against standardised methodology. A report is a description, not a guarantee of value, and different laboratories can apply grading conventions with subtly different strictness. Comparing stones fairly means checking which laboratory issued each report before comparing the grades themselves.",
          "The four Cs are the vocabulary of that report, and this chapter's purpose is fluency: the ability to read a certificate, ask an informed question about a discrepancy, and explain to a client why the numbers on paper matter less than the stone in front of them, and also why they matter at all.",
        ],
      },
    ],
    takeaways: [
      "The four Cs are interacting judgements against a reference, not independent facts.",
      "Cut quality governs how colour and clarity are actually perceived and is the most commonly underweighted C.",
      "Independent laboratory reports describe a stone under standardised methodology; they are not value guarantees.",
      "Fluency in reading a certificate lets a director bridge the gap between paper grades and the stone in hand.",
    ],
    quiz: [
      {
        prompt: "Why can two diamonds with identical colour and clarity grades appear visually different?",
        options: [
          { text: "Because clarity grades are always approximate" },
          { text: "Because cut quality determines how efficiently light is returned to the eye", correct: true },
          { text: "Because carat weight always overrides other factors" },
          { text: "Because colour grading has no fixed reference" },
        ],
        explanation: "Cut determines brightness, fire, and scintillation, and is the variable that most affects how identically graded stones actually look.",
      },
      {
        prompt: "What is a gemmological laboratory report best understood as?",
        options: [
          { text: "A guarantee of resale value" },
          { text: "A legally binding valuation" },
          { text: "A standardised description of a stone's characteristics", correct: true },
          { text: "A certificate of ethical origin" },
        ],
        explanation: "A report describes characteristics under a standardised methodology; it does not guarantee value or origin ethics on its own.",
      },
      {
        prompt: "Why might comparing reports from two different laboratories be misleading?",
        options: [
          { text: "Laboratories use entirely different units of mass" },
          { text: "Grading conventions can differ subtly in strictness between laboratories", correct: true },
          { text: "Only one laboratory in the world issues reports" },
          { text: "Reports are updated automatically over time" },
        ],
        explanation: "Different laboratories can apply grading standards with varying strictness, so a like-for-like comparison should account for the issuing lab.",
      },
    ],
  },
  {
    chapter: "II",
    reading: [
      {
        heading: "Ruby, sapphire, emerald, spinel",
        paragraphs: [
          "Ruby and sapphire are both the mineral corundum, distinguished by trace elements that produce colour: chromium for ruby's red, iron and titanium for sapphire's blue, with other trace elements producing the full sapphire spectrum. Emerald is a colour variety of beryl, coloured by chromium or vanadium, and prized for its colour even at the cost of clarity that would be unacceptable in a diamond. Spinel, historically confused with ruby for centuries because the two can look remarkably alike, is now collected in its own right and often offers comparable colour at a different price point.",
          "Understanding the mineral family behind a stone's name protects a director from a common client confusion: names describe colour and species conventions, not always a single mineral, and knowing the difference is a basic form of professional credibility.",
        ],
      },
      {
        heading: "Origin and its market weight",
        paragraphs: [
          "Certain origins carry a market premium built over decades of trade history and perceived quality association, such as Kashmir sapphire or Colombian emerald. Origin determination relies on trace element chemistry and inclusion patterns studied by specialist laboratories, and remains an opinion built on comparative data, not an absolute fact in every case. Reasonable specialists can disagree on borderline stones.",
          "A director should treat an origin claim the way a careful buyer treats any expert opinion: understand which laboratory made the determination, on what basis, and with what degree of confidence, and disclose that clearly to a client rather than presenting origin as beyond question.",
        ],
      },
      {
        heading: "Treatments and disclosure",
        paragraphs: [
          "Heat treatment to improve colour and clarity is standard, accepted market practice for corundum and has been for a very long time; it is disclosed, not hidden, and priced accordingly. Other treatments, such as fracture filling in emerald or diffusion treatments in corundum, are more invasive, more market-sensitive, and require clear disclosure because they affect both durability and value materially.",
          "The single non-negotiable principle across all coloured stone trading is disclosure. A treatment that is common and accepted becomes a problem only when it is concealed. This chapter trains the habit of asking, and stating, what has been done to a stone before any conversation about price begins.",
        ],
      },
    ],
    takeaways: [
      "Ruby and sapphire are both corundum, distinguished by the trace elements that produce their colour.",
      "Origin claims for coloured stones are expert determinations based on trace chemistry and inclusions, not absolute facts.",
      "Heat treatment in corundum is standard, accepted, and must be disclosed; more invasive treatments carry greater sensitivity.",
      "Disclosure, not the mere existence of treatment, is the principle that protects both client trust and market integrity.",
    ],
    quiz: [
      {
        prompt: "What distinguishes ruby from sapphire mineralogically?",
        options: [
          { text: "They are entirely different minerals" },
          { text: "Both are corundum, distinguished by the trace elements producing colour", correct: true },
          { text: "Ruby is a treated form of sapphire" },
          { text: "Sapphire is only ever blue by definition" },
        ],
        explanation: "Ruby and sapphire are both corundum; trace elements such as chromium or iron and titanium determine the resulting colour.",
      },
      {
        prompt: "How should a director present an origin determination for a coloured stone?",
        options: [
          { text: "As an absolute, undisputed fact in all cases" },
          { text: "As an expert opinion with a stated basis and degree of confidence", correct: true },
          { text: "Only if the client does not ask about the laboratory" },
          { text: "As irrelevant to the stone's value" },
        ],
        explanation: "Origin determination is a specialist opinion based on comparative trace chemistry and inclusion data, and should be disclosed as such.",
      },
      {
        prompt: "What is the central principle governing treatment disclosure in coloured stones?",
        options: [
          { text: "Treatments should never be disclosed to preserve value" },
          { text: "Only untreated stones may legally be sold" },
          { text: "Disclosure of any treatment is required regardless of how standard it is", correct: true },
          { text: "Disclosure is only necessary for emeralds" },
        ],
        explanation: "The trade principle is disclosure: standard treatments are acceptable when disclosed, and concealment is what damages trust and value.",
      },
    ],
  },
  {
    chapter: "III",
    reading: [
      {
        heading: "What a phenomenon is",
        paragraphs: [
          "A phenomenal gem displays an optical effect beyond simple colour, caused by its internal structure interacting with light in a specific way. Opal's play of colour comes from a regular internal arrangement of microscopic silica spheres that diffracts light into spectral flashes. Star sapphire and star ruby show asterism, a star-shaped reflection caused by intersecting needle-like inclusions aligned with the crystal structure. Alexandrite changes colour dramatically between daylight and incandescent light, a property called the alexandrite effect, tied to how its trace chromium absorbs different wavelengths under different light sources. Cat's eye chrysoberyl shows chatoyancy, a single bright line of reflected light caused by parallel fibrous inclusions.",
          "Each phenomenon has a specific structural cause, and being able to name the cause, not just recognise the effect, is what separates a director from an enthusiast when a client asks a genuine question.",
        ],
      },
      {
        heading: "Reading the phenomenon, not just the stone",
        paragraphs: [
          "Evaluating a phenomenal gem requires assessing the phenomenon's quality alongside the stone's other properties: a star sapphire is judged on how centred, sharp, and complete its star is under a single point light source, in addition to its colour and transparency. An opal is judged on the pattern, size, and brightness of its colour flashes, and on the stability of the material itself, since some opal is prone to crazing over time due to water content changes.",
          "This means the cutting and orientation of a phenomenal stone matters even more than for a faceted gem, since a cutter must orient the rough precisely to centre the phenomenon, often sacrificing carat weight to do so. A well-centred, lower-carat star sapphire is frequently worth more than a larger stone with an off-centre or weak star.",
        ],
      },
      {
        heading: "Handling and presentation",
        paragraphs: [
          "Phenomenal gems are typically cut as cabochons, a smooth domed cut rather than a faceted one, because facets would disrupt the very optical structure being displayed. Presenting one to a client benefits from a single directional light source moved slowly across the stone, since the phenomenon often only becomes fully visible in motion.",
          "A director who can walk a client through why a stone behaves the way it does, structurally and simply, converts a curiosity into genuine appreciation, which is a large part of what distinguishes a considered acquisition from an impulse purchase.",
        ],
      },
    ],
    takeaways: [
      "Phenomenal effects arise from specific internal structures: silica spheres in opal, aligned inclusions in star stones, and trace element light absorption in alexandrite.",
      "Evaluating a phenomenal gem means judging the phenomenon's quality, not only the stone's colour and clarity.",
      "Cutting a phenomenal gem to centre its phenomenon often sacrifices carat weight in exchange for optical quality.",
      "Phenomenal gems are cut as cabochons and are best presented under a single moving light source.",
    ],
    quiz: [
      {
        prompt: "What structurally causes opal's play of colour?",
        options: [
          { text: "A single large air bubble inside the stone" },
          { text: "A regular internal arrangement of microscopic silica spheres diffracting light", correct: true },
          { text: "Surface scratches that scatter light randomly" },
          { text: "Chemical treatment applied after cutting" },
        ],
        explanation: "Opal's play of colour is caused by a regular lattice of microscopic silica spheres diffracting light into spectral colours.",
      },
      {
        prompt: "Why are phenomenal gems typically cut as cabochons rather than faceted?",
        options: [
          { text: "Cabochon cutting is faster and cheaper" },
          { text: "Facets would disrupt the optical structure that produces the phenomenon", correct: true },
          { text: "Faceting is not possible on any coloured stone" },
          { text: "Cabochons weigh less than faceted stones" },
        ],
        explanation: "A smooth domed cabochon surface preserves the internal structure and orientation needed to display asterism, chatoyancy, or play of colour.",
      },
      {
        prompt: "Why might a smaller star sapphire be worth more than a larger one?",
        options: [
          { text: "Smaller stones are always rarer by definition" },
          { text: "If its star is better centred, sharper, and more complete", correct: true },
          { text: "Because larger stones cannot show asterism" },
          { text: "Because carat weight is irrelevant to phenomenal gems" },
        ],
        explanation: "Phenomenal gem value weighs the quality of the phenomenon itself, which cutting to centre it can require trading off carat weight to achieve.",
      },
    ],
  },
  {
    chapter: "IV",
    reading: [
      {
        heading: "The instruments of identification",
        paragraphs: [
          "A refractometer measures a stone's refractive index, the degree to which it bends light, which is one of the most reliable single measurements for distinguishing gem species. A polariscope reveals whether a stone is singly or doubly refractive by observing how it behaves between crossed polarising filters, narrowing identification quickly. A spectroscope examines the specific wavelengths of light absorbed by a stone, revealing trace element signatures that can distinguish natural from synthetic material or identify treatment.",
          "None of these instruments works in isolation. Gemmological identification is a process of narrowing possibilities through multiple independent measurements, cross-checked against each other, rather than a single decisive test.",
        ],
      },
      {
        heading: "Modern spectral tools",
        paragraphs: [
          "Advanced laboratories now use techniques such as Raman spectroscopy and photoluminescence spectroscopy to identify treatments and, in the case of diamonds, to distinguish natural stones from laboratory-grown ones with a precision unavailable to classical instruments alone. These tools examine molecular and atomic-level signatures that are effectively impossible to disguise convincingly.",
          "A director does not need to operate these instruments personally, but does need to understand what each can and cannot determine, so that a laboratory report's methodology section can be read with genuine comprehension rather than treated as an unreadable appendix.",
        ],
      },
      {
        heading: "The discipline of process",
        paragraphs: [
          "Good laboratory practice follows a consistent sequence: visual and microscopic examination first, basic optical tests second, advanced spectral analysis only where the first two leave genuine ambiguity. Skipping steps to save time is how misidentifications happen, particularly with sophisticated synthetics and treatments designed specifically to defeat casual inspection.",
          "This chapter's aim is not to produce gemmologists in a single sitting, but to build enough procedural literacy that a director can ask a laboratory the right questions and recognise when a stone genuinely warrants a second opinion.",
        ],
      },
    ],
    takeaways: [
      "Refractive index, measured by a refractometer, is one of the most reliable single measurements for identifying gem species.",
      "A polariscope quickly narrows identification by revealing single versus double refraction.",
      "Spectroscopy reveals trace element signatures useful for distinguishing natural, synthetic, and treated material.",
      "Reliable identification follows a disciplined sequence of tests rather than relying on any single instrument.",
    ],
    quiz: [
      {
        prompt: "What does a refractometer measure?",
        options: [
          { text: "The exact carat weight of a stone" },
          { text: "The degree to which a stone bends light, its refractive index", correct: true },
          { text: "The hardness of a stone on the Mohs scale" },
          { text: "The country of origin of a stone" },
        ],
        explanation: "Refractive index is one of the most diagnostic single measurements for narrowing down gem species identification.",
      },
      {
        prompt: "Why do laboratories use advanced spectral tools like Raman spectroscopy?",
        options: [
          { text: "To measure a stone's market price" },
          { text: "To examine molecular signatures that distinguish natural, synthetic, and treated material", correct: true },
          { text: "To determine a stone's carat weight more precisely" },
          { text: "To polish a stone during testing" },
        ],
        explanation: "Advanced spectral tools examine atomic and molecular signatures that classical instruments cannot resolve, particularly for sophisticated synthetics and treatments.",
      },
      {
        prompt: "What is the recommended sequence in sound gemmological identification practice?",
        options: [
          { text: "Advanced spectral analysis first, visual inspection last" },
          { text: "Visual and microscopic examination first, then basic optical tests, then advanced analysis if ambiguity remains", correct: true },
          { text: "Only ever use one instrument to avoid contradictory results" },
          { text: "Skip visual inspection entirely for efficiency" },
        ],
        explanation: "A disciplined sequence, from visual examination through optical tests to advanced spectral analysis when needed, reduces the risk of misidentification.",
      },
    ],
  },
  {
    chapter: "V",
    reading: [
      {
        heading: "The Kimberley Process and its limits",
        paragraphs: [
          "The Kimberley Process is an international certification scheme intended to prevent rough diamonds from conflict zones entering the legitimate supply chain, established by governments, industry, and civil society organisations in the early 2000s. It requires participating countries to certify shipments of rough diamonds as conflict free before export. It is a meaningful mechanism, and it also has a narrower scope than many clients assume, focused specifically on rough stones tied to rebel financing rather than the full range of ethical concerns in mining broadly.",
          "A director should be able to explain both what the Kimberley Process covers and what it does not, since overstating its scope to a client is itself a disclosure failure, and the Governance Charter of this Academy treats accurate disclosure as a non-negotiable standard in every subject it teaches.",
        ],
      },
      {
        heading: "Responsible mining beyond certification",
        paragraphs: [
          "Beyond the Kimberley Process, responsible sourcing considers labour conditions, environmental impact, community relations, and traceability of the full supply chain from mine to market. Various industry initiatives and voluntary standards exist to address these broader concerns, with varying degrees of rigor and independent verification, and a director should understand that not all sourcing claims carry equal weight or evidence behind them.",
          "For coloured stones in particular, where supply chains are often more fragmented and artisanal than diamond mining, traceability is a harder and more recent undertaking, and clients increasingly ask about it directly. Being able to describe honestly what is and is not currently verifiable is more valuable to long-term trust than offering reassurance that outpaces the evidence.",
        ],
      },
      {
        heading: "Disclosure as ethical practice",
        paragraphs: [
          "Treatment disclosure, discussed in earlier chapters, is itself part of the ethics of the trade: presenting a treated stone as untreated is a form of misrepresentation regardless of the treatment's market acceptance. Ethical practice in gemstones is therefore not a single certificate but a habit spanning origin, treatment, and sourcing conditions, disclosed consistently and without selective emphasis.",
          "This chapter closes the gemmological portion of the curriculum by tying its technical content back to the Academy's broader Governance Charter: expertise without honest disclosure is not expertise a client can actually trust.",
        ],
      },
    ],
    takeaways: [
      "The Kimberley Process certifies rough diamond shipments as conflict free but has a scope narrower than full ethical sourcing.",
      "Responsible mining considers labour, environmental impact, and traceability beyond conflict financing alone.",
      "Coloured stone supply chains are often more fragmented, making full traceability a harder, still-developing undertaking.",
      "Ethical practice in gemstones is a consistent habit of disclosure across origin, treatment, and sourcing, not a single certificate.",
    ],
    quiz: [
      {
        prompt: "What is the primary scope of the Kimberley Process?",
        options: [
          { text: "Certifying labour conditions at all mining sites globally" },
          { text: "Certifying rough diamond shipments as free from rebel-financing conflict ties", correct: true },
          { text: "Guaranteeing environmental standards at every mine" },
          { text: "Certifying the treatment status of coloured stones" },
        ],
        explanation: "The Kimberley Process specifically addresses conflict financing in rough diamonds, and does not cover the full range of ethical mining concerns.",
      },
      {
        prompt: "Why is traceability often harder to achieve for coloured stones than diamonds?",
        options: [
          { text: "Coloured stones are never mined commercially" },
          { text: "Coloured stone supply chains are often more fragmented and artisanal", correct: true },
          { text: "Coloured stones are not subject to any sourcing standards" },
          { text: "There are no coloured stone mining regions" },
        ],
        explanation: "Coloured stone supply chains frequently involve smaller-scale, artisanal mining, making full traceability a harder and more recent undertaking than for diamonds.",
      },
      {
        prompt: "According to this chapter, what defines ethical practice in the gemstone trade?",
        options: [
          { text: "Holding a single internationally recognised certificate" },
          { text: "A consistent habit of disclosure across origin, treatment, and sourcing conditions", correct: true },
          { text: "Avoiding any mention of treatment to protect value" },
          { text: "Relying solely on the Kimberley Process for all stone types" },
        ],
        explanation: "The chapter frames ethical practice as consistent, honest disclosure across every relevant dimension, not a single certification.",
      },
    ],
  },
  {
    chapter: "VI",
    reading: [
      {
        heading: "The studio format",
        paragraphs: [
          "This capstone chapter is a guided, hands-on examination of fifty stones spanning the categories covered across the Institute: diamonds of varying colour and clarity, the major coloured stones, and representative phenomenal gems. Each stone is examined under supervision using the loupe and instruments introduced in earlier chapters, with the aim of building genuine muscle memory rather than reviewing theory again.",
          "The exercise is structured to move from easier to harder identifications, beginning with stones showing clear diagnostic features and progressing to ambiguous cases that require combining several observations, exactly as a director would encounter in practice rather than in a textbook.",
        ],
      },
      {
        heading: "Building an observation habit",
        paragraphs: [
          "For each stone, the learner records observations before consulting any reference answer: apparent colour and its evenness, visible inclusions and their character, evidence of cutting quality, and any phenomenon present. Only after recording independent observations does the exercise reveal the stone's identity and relevant report data, so that the learner's own judgement is tested honestly rather than reverse-engineered from the answer.",
          "This sequence, observe first and check second, is the single most transferable habit this chapter teaches, and it is the same discipline a director will need every time a client places an unfamiliar stone on the table and asks a direct question.",
        ],
      },
      {
        heading: "From studio to client conversation",
        paragraphs: [
          "The final stage of the exercise asks the learner to explain each stone's identification and quality in the plain language a client would actually understand, translating loupe observations and instrument readings into a coherent, honest description free of jargon and free of overstatement.",
          "Completing this chapter does not confer certification as a gemmologist; it demonstrates disciplined completion of the Institute's self-study curriculum and knowledge checks, consistent with the Academy's Governance Charter on the honest framing of course outcomes.",
        ],
      },
    ],
    takeaways: [
      "The studio exercise examines fifty stones under supervision, moving from clear diagnostic cases to genuinely ambiguous ones.",
      "Recording independent observations before consulting reference answers builds honest, transferable judgement.",
      "Translating technical observations into plain, accurate client language is the final and most practical skill trained here.",
      "Completion demonstrates disciplined self-study, not professional gemmological certification.",
    ],
    quiz: [
      {
        prompt: "Why does the studio exercise ask learners to record observations before revealing each stone's identity?",
        options: [
          { text: "To save time during the session" },
          { text: "To test the learner's own judgement honestly rather than reverse-engineering it from the answer", correct: true },
          { text: "Because instruments are not needed for this exercise" },
          { text: "Because the identities are randomly assigned" },
        ],
        explanation: "Observing first and checking second builds genuine, honest judgement rather than pattern-matching to a known answer.",
      },
      {
        prompt: "What is the final stage of the studio exercise designed to build?",
        options: [
          { text: "Speed in cutting rough stones" },
          { text: "The ability to translate technical observations into plain, accurate client language", correct: true },
          { text: "Memorisation of laboratory report templates" },
          { text: "Skill in negotiating stone prices" },
        ],
        explanation: "The exercise concludes by training the practical skill of explaining findings honestly and clearly to a client, without jargon or overstatement.",
      },
      {
        prompt: "What does completing this chapter's studio exercise represent?",
        options: [
          { text: "Professional certification as a gemmologist" },
          { text: "Disciplined completion of the Institute's self-study curriculum and knowledge checks", correct: true },
          { text: "Legal authorisation to issue gemmological reports" },
          { text: "Automatic membership in an international grading body" },
        ],
        explanation: "Consistent with the Academy's Governance Charter, completion reflects disciplined self-study, not a professional credential or certification.",
      },
    ],
  },
];

export default gemstonesCurriculum;
