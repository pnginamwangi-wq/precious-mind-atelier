/**
 * Institute of Artificial Intelligence — full lesson content.
 *
 * Written under the same Governance Charter constraints as the other
 * Institutes: no fabricated statistics, no named living individuals, and
 * no exaggerated claims about what AI systems can achieve. Consistent with
 * Article VIII of the Governance Charter, this Institute treats AI
 * transparency and honest scoping of capability as a core subject, not
 * only a compliance formality.
 */

import type { ChapterContent } from "./types";

const artificialIntelligenceCurriculum: ChapterContent[] = [
  {
    chapter: "I",
    reading: [
      {
        heading: "What a modern model actually does",
        paragraphs: [
          "A modern AI language model is trained on very large volumes of text to predict plausible continuations of language, a deceptively simple objective that, at sufficient scale, produces systems capable of drafting text, answering questions, and following instructions with considerable fluency. Understanding this foundation matters because it explains both the system's genuine strengths, fluent language handling and broad general knowledge, and its genuine limitations, a tendency to produce confident-sounding but incorrect statements, since the underlying objective is plausibility of language, not verified truth.",
          "A director does not need to understand the mathematics behind these systems to lead an AI programme responsibly, but does need this basic, honest mental model: the system is a powerful pattern completion tool, not an oracle, and treating its outputs accordingly is the foundation of every other chapter in this Institute.",
        ],
      },
      {
        heading: "Why fluency is not the same as reliability",
        paragraphs: [
          "Because these models are trained to produce fluent, plausible text, their errors are often fluent and plausible too, a phenomenon sometimes called hallucination, where a system states an incorrect fact with the same confident tone as a correct one. This is a structural property of how these systems work, not a bug that will necessarily be eliminated by a future version, and a director should build workflows assuming it will occur rather than being surprised when it does.",
          "Practically, this means any AI-generated output touching factual claims, provenance, pricing, or client-specific information should be treated as a draft requiring human verification, never as a final, trusted answer, particularly in a luxury context where a single confidently wrong statement can materially damage client trust.",
        ],
      },
      {
        heading: "Capability without hype",
        paragraphs: [
          "This chapter deliberately avoids both dismissing AI as a passing trend and overstating it as a wholesale replacement for human expertise and judgement; the honest position, and the one this Institute takes throughout, is that these are genuinely useful tools for specific tasks, drafting, summarising, pattern recognition, when deployed with clear understanding of their limitations and appropriate human oversight.",
          "A director's job is to develop this calibrated view personally, so that vendor claims and industry enthusiasm can be evaluated against a genuine understanding of what these systems do, rather than either uncritical adoption or reflexive skepticism.",
        ],
      },
    ],
    takeaways: [
      "Modern AI language models are trained to predict plausible text continuations, not to verify truth, which explains both their fluency and their errors.",
      "Hallucination, confidently stated but incorrect output, is a structural property of these systems, not simply a bug to be eliminated.",
      "AI-generated content touching facts, provenance, or pricing should always be treated as a draft requiring human verification.",
      "A calibrated view, neither dismissive nor uncritical, is the foundation for evaluating AI tools and vendor claims responsibly.",
    ],
    quiz: [
      {
        prompt: "What is the core training objective of a modern AI language model?",
        options: [
          { text: "To verify the truth of every statement it produces" },
          { text: "To predict plausible continuations of language based on patterns in training text", correct: true },
          { text: "To store a fixed database of verified facts" },
          { text: "To replace human judgement entirely" },
        ],
        explanation: "These models are trained to produce plausible language continuations, which explains both their fluency and their tendency toward confident but incorrect statements.",
      },
      {
        prompt: "What does the term 'hallucination' refer to in this context?",
        options: [
          { text: "A system refusing to answer a question" },
          { text: "A system stating an incorrect fact with the same confident tone as a correct one", correct: true },
          { text: "A system running unusually slowly" },
          { text: "A system asking a clarifying question" },
        ],
        explanation: "Hallucination describes confidently stated but incorrect output, a structural property of how these systems generate plausible language.",
      },
      {
        prompt: "How should AI-generated content touching factual claims be treated?",
        options: [
          { text: "As a final, trusted answer requiring no further review" },
          { text: "As a draft requiring human verification before use", correct: true },
          { text: "As always more reliable than human research" },
          { text: "As irrelevant to client-facing communication" },
        ],
        explanation: "Given the structural risk of hallucination, factual AI output should always be verified by a human before being treated as reliable.",
      },
    ],
  },
  {
    chapter: "II",
    reading: [
      {
        heading: "Vision models and pattern recognition",
        paragraphs: [
          "Vision models, a category of AI trained on images rather than text, can be applied to tasks such as flagging visual inconsistencies in a hallmark, comparing a watch movement's finishing against known patterns, or identifying visual characteristics associated with a gemstone treatment, functioning as a pattern recognition aid rather than a definitive authentication authority. These tools can process and compare visual detail faster and more consistently than a human eye across large volumes, which is genuinely useful for triage and flagging items warranting closer expert attention.",
          "Understanding what these tools actually do, compare patterns against training data, matters because it clarifies their proper role: a well-calibrated flag for expert review, not a replacement for the human authentication expertise taught throughout the other Institutes in this Academy.",
        ],
      },
      {
        heading: "The limits of automated verification",
        paragraphs: [
          "Authentication of high value items, gemstones, hallmarks, watch movements, ultimately depends on physical examination using specialised instruments and trained human judgement, as taught in the relevant Institutes; AI vision tools support this process by flagging items for closer attention and by processing volume efficiently, but a confident-sounding AI output about authenticity is not a substitute for that underlying expert process.",
          "A director deploying vision tools in this context must be explicit, internally and with clients where relevant, about this distinction: the tool assists a verification process, it does not itself constitute verification, and presenting it otherwise would be a disclosure failure inconsistent with the Academy's Governance Charter.",
        ],
      },
      {
        heading: "Where these tools add genuine value",
        paragraphs: [
          "The strongest current use case for vision models in this context is triage at scale: reviewing a large inventory or incoming consignment quickly to flag items that most warrant expert time, rather than replacing the expert examination itself. This lets scarce specialist attention be allocated more efficiently, which is a genuine, meaningful benefit distinct from claiming the tool performs authentication independently.",
          "This chapter closes by asking learners to articulate, in plain language appropriate for a client or team conversation, exactly where a vision tool's role begins and ends in an authentication workflow, since this clarity is itself a professional skill.",
        ],
      },
    ],
    takeaways: [
      "Vision models can flag visual inconsistencies and patterns, functioning as an aid to authentication rather than a definitive authority.",
      "Physical examination and trained human judgement remain the foundation of authentication for gemstones, hallmarks, and watch movements.",
      "Presenting an AI vision tool's output as equivalent to expert verification would be a disclosure failure under the Academy's Governance Charter.",
      "The strongest current use case for these tools is efficient triage at scale, directing expert attention rather than replacing it.",
    ],
    quiz: [
      {
        prompt: "What is the appropriate role of a vision model in gemstone or watch authentication?",
        options: [
          { text: "A definitive replacement for expert physical examination" },
          { text: "A pattern recognition aid that flags items for closer expert attention", correct: true },
          { text: "A legal certification authority" },
          { text: "An irrelevant tool with no useful application" },
        ],
        explanation: "Vision models support authentication by flagging patterns for review; they do not replace the trained human judgement and physical examination that constitute actual verification.",
      },
      {
        prompt: "Why must a director be explicit about the limits of AI vision tools in authentication?",
        options: [
          { text: "Because the tools are never useful in practice" },
          { text: "Because presenting the tool's output as equivalent to expert verification would be a disclosure failure", correct: true },
          { text: "Because clients never ask about authentication methods" },
          { text: "Because vision tools always outperform human experts" },
        ],
        explanation: "Overstating what a vision tool has verified, rather than flagged for review, misrepresents the actual authentication process to a client.",
      },
      {
        prompt: "What is described as the strongest current use case for vision models in this context?",
        options: [
          { text: "Fully automated, unsupervised authentication decisions" },
          { text: "Efficient triage at scale, directing expert attention to items that most warrant it", correct: true },
          { text: "Replacing gemmological laboratories entirely" },
          { text: "Setting final retail prices automatically" },
        ],
        explanation: "The chapter identifies scaled triage, efficiently directing scarce expert attention, as the genuine, well-supported current value of these tools.",
      },
    ],
  },
  {
    chapter: "III",
    reading: [
      {
        heading: "The private assistant, defined narrowly",
        paragraphs: [
          "A clienteling intelligence assistant is an AI system configured with a house's specific product knowledge, past client interaction patterns, and communication style, intended to help an advisor prepare for a client conversation or draft a follow-up more efficiently, not to conduct the client relationship independently. Framing the tool's purpose narrowly, as an assistant to a human advisor, rather than broadly, as a replacement for the advisor, is itself a governance decision with real consequences for how the tool should be built and deployed.",
          "This narrow framing also protects client trust: clients in this segment expect and value genuine human relationships, and a director should ensure the tool strengthens an advisor's ability to serve a client personally, rather than inserting an impersonal layer between them.",
        ],
      },
      {
        heading: "Data boundaries and client trust",
        paragraphs: [
          "Building a private, on-brand assistant requires careful decisions about what client data feeds the system, how that data is protected, and who can access outputs that may reference sensitive client details such as financial capacity or personal circumstances. These decisions should be made deliberately and documented clearly, consistent with whatever privacy and data protection obligations apply to the business, rather than left as an afterthought once the tool is already in use.",
          "A director should assume that any data given to an AI system could, through misconfiguration or a security failure, become visible in ways not originally intended, and should design data boundaries with that risk explicitly in mind rather than assuming best-case scenarios by default.",
        ],
      },
      {
        heading: "Where the assistant should and should not decide",
        paragraphs: [
          "A well-designed clienteling assistant might draft a follow-up note or summarise a client's stated preferences for an advisor's quick review, but final judgement calls, what to say in a sensitive conversation, how to handle an objection, whether to extend a particular courtesy, should remain with the human advisor, who carries both the relationship and the accountability for it.",
          "This chapter's closing principle is that AI assistance in clienteling should measurably increase an advisor's capacity to be genuinely present and thoughtful with a client, and any deployment that instead makes interactions feel more automated or impersonal has failed the actual goal, regardless of its technical sophistication.",
        ],
      },
    ],
    takeaways: [
      "A clienteling assistant should be framed narrowly as a support tool for a human advisor, not a replacement for the client relationship.",
      "Data boundaries for any client-facing AI tool should be deliberately designed and documented, assuming realistic risk rather than best-case scenarios.",
      "Final judgement calls in sensitive client interactions should remain with the human advisor, who holds the relationship and its accountability.",
      "Success for a clienteling assistant means increasing an advisor's genuine presence with a client, not making interactions feel more automated.",
    ],
    quiz: [
      {
        prompt: "How should a clienteling intelligence assistant's purpose be framed?",
        options: [
          { text: "As a full replacement for the human advisor" },
          { text: "As a support tool helping an advisor prepare for and follow up on client conversations", correct: true },
          { text: "As a system that should conduct all client communication independently" },
          { text: "As irrelevant to genuine client relationships" },
        ],
        explanation: "Framing the tool narrowly as an assistant to a human advisor protects the genuine, personal relationship clients in this segment expect.",
      },
      {
        prompt: "How should data boundaries be designed for a clienteling AI system?",
        options: [
          { text: "Assuming best-case scenarios and minimal risk" },
          { text: "Deliberately, assuming realistic risk of misconfiguration or security failure", correct: true },
          { text: "Only after the tool has already been deployed" },
          { text: "Without any documentation, to preserve flexibility" },
        ],
        explanation: "Given the sensitivity of client data, boundaries should be designed deliberately and documented, accounting for realistic risk rather than assuming everything will work as intended.",
      },
      {
        prompt: "What defines success for a clienteling assistant, according to this chapter?",
        options: [
          { text: "Making client interactions feel more automated" },
          { text: "Increasing an advisor's capacity to be genuinely present and thoughtful with a client", correct: true },
          { text: "Removing the need for human advisors entirely" },
          { text: "Maximising the volume of AI-generated client messages" },
        ],
        explanation: "The chapter's closing principle is that the tool should measurably enhance genuine human presence, not replace or automate it away.",
      },
    ],
  },
  {
    chapter: "IV",
    reading: [
      {
        heading: "AI as a design collaborator",
        paragraphs: [
          "In creative ateliers, AI tools can support early-stage exploration, generating moodboards, visual variations, or draft concepts quickly for a design team to react to, evaluate, and refine, functioning as a rapid ideation partner rather than a source of finished creative direction. This can meaningfully compress the early exploratory phase of a design process, giving a design team more variations to consider before committing significant time to detailed gouache rendering or technical drawing.",
          "The value here is speed and volume of early exploration, not a replacement for the trained aesthetic judgement a design director brings to selecting, refining, and rejecting among the possibilities generated, human or AI-assisted.",
        ],
      },
      {
        heading: "Intellectual property considerations",
        paragraphs: [
          "Using AI creative tools raises genuine, still-evolving questions about intellectual property: the ownership status of AI-generated images can vary by jurisdiction and by the specific tool's terms of use, and a director should treat this as an area requiring actual legal guidance specific to the house's situation, not assumption. Some AI image generation tools have also faced scrutiny over whether their training data appropriately used copyrighted creative works, a matter directly relevant to a luxury house's own IP practices and reputation.",
          "Consistent with this Academy's own Governance Charter on original intellectual property, a director should apply the same diligence to AI-assisted creative output that would be applied to any other externally sourced creative material before it is used in a house's actual design or marketing work.",
        ],
      },
      {
        heading: "Where human craft remains irreplaceable",
        paragraphs: [
          "Nothing in current AI creative tools substitutes for the hand skill, material knowledge, and trained aesthetic judgement taught in the Jewellery Institute's chapters on design and bench craft; AI-assisted moodboards and concept images are inputs to a human creative process, not outputs a house can present as finished, original design work without substantial human creative contribution.",
          "This chapter closes by asking learners to identify, for a hypothetical design brief, exactly where AI assistance would add genuine value in the early exploratory stage and exactly where human craft judgement must take over, reinforcing the collaborative rather than substitutive framing this Institute applies throughout.",
        ],
      },
    ],
    takeaways: [
      "AI creative tools are most useful for rapid early-stage exploration, generating moodboards and variations for a design team to evaluate.",
      "The value lies in speed and volume of exploration, not replacing the trained aesthetic judgement of a human design director.",
      "Intellectual property status of AI-generated creative content varies by jurisdiction and tool, requiring actual legal guidance rather than assumption.",
      "AI-assisted concepts are inputs to a human creative process, not finished original design work in themselves.",
    ],
    quiz: [
      {
        prompt: "What is the primary value of AI tools in early-stage creative exploration?",
        options: [
          { text: "Producing finished, ready-to-use creative direction" },
          { text: "Generating rapid moodboards and variations for a design team to evaluate and refine", correct: true },
          { text: "Replacing the need for a design director entirely" },
          { text: "Eliminating the need for gouache rendering or technical drawing" },
        ],
        explanation: "AI creative tools are most valuable for compressing early exploration, generating options quickly for human evaluation and refinement.",
      },
      {
        prompt: "Why should a director seek actual legal guidance regarding AI-generated creative content?",
        options: [
          { text: "Because intellectual property status is identical everywhere" },
          { text: "Because ownership status can vary by jurisdiction and by the specific tool's terms of use", correct: true },
          { text: "Because AI-generated content can never be used commercially" },
          { text: "Because legal guidance is unnecessary for creative work" },
        ],
        explanation: "IP status of AI-generated content is genuinely variable and evolving, making case-specific legal guidance necessary rather than assumption.",
      },
      {
        prompt: "How does this chapter frame AI-assisted concepts relative to finished design work?",
        options: [
          { text: "As equivalent to finished, original design work" },
          { text: "As inputs to a human creative process, not a substitute for it", correct: true },
          { text: "As irrelevant to the design process" },
          { text: "As a replacement for bench craft entirely" },
        ],
        explanation: "AI-assisted moodboards and concepts are treated as early inputs requiring substantial human creative contribution before becoming finished work.",
      },
    ],
  },
  {
    chapter: "V",
    reading: [
      {
        heading: "Data governance as a house responsibility",
        paragraphs: [
          "Any AI deployment touching client data, from clienteling assistants to vision-based authentication tools, requires clear governance: what data is used, how it is protected, who can access it, and how long it is retained, documented deliberately rather than left implicit. This is not merely a legal compliance exercise; a house's data practices are part of the trust relationship with clients who have shared sensitive personal and financial information on the understanding it will be handled with care.",
          "A director leading an AI programme should ensure data governance decisions are made with the same seriousness applied to any other significant business risk, involving legal and privacy expertise appropriate to the house's situation rather than treating it as a purely technical afterthought.",
        ],
      },
      {
        heading: "Intellectual property inside the house",
        paragraphs: [
          "Beyond client data, houses must consider the IP status of their own proprietary information, design archives, client lists, house-specific training material, before feeding it into third-party AI systems, since terms of use for such systems vary considerably in what rights they claim over submitted data. A director should read and understand these terms before adopting a tool at any meaningful scale, rather than assuming favourable terms by default.",
          "This due diligence protects a house's competitive position and its clients' trust simultaneously, and treating it seriously is itself a signal of a mature, responsible approach to AI adoption.",
        ],
      },
      {
        heading: "Ethics as an ongoing practice, not a one-time policy",
        paragraphs: [
          "The ethics of AI inside a house of taste extend beyond data and IP to questions of transparency with clients, when and how AI involvement in a service or communication is disclosed, and fairness, ensuring AI tools do not introduce bias into decisions about which clients receive attention or which items are flagged for scrutiny. These are not questions with a single settled answer; they require ongoing attention as tools and their uses evolve.",
          "This chapter closes by framing AI governance as a continuing practice requiring periodic review, not a policy document written once and left untouched, consistent with the Academy's own Governance Charter commitment to AI transparency as an active, ongoing obligation.",
        ],
      },
    ],
    takeaways: [
      "AI data governance should be documented deliberately, covering what data is used, how it is protected, and who can access it.",
      "A house's data practices are part of the client trust relationship, not merely a legal compliance exercise.",
      "Third-party AI tool terms of use should be read and understood before adoption, since they vary in what rights they claim over submitted data.",
      "AI governance, including transparency and fairness, is an ongoing practice requiring periodic review, not a one-time policy.",
    ],
    quiz: [
      {
        prompt: "Why is a house's AI data governance considered part of the client trust relationship?",
        options: [
          { text: "Because data governance is purely a legal formality" },
          { text: "Because clients share sensitive information on the understanding it will be handled with care", correct: true },
          { text: "Because clients never provide personal information to luxury houses" },
          { text: "Because data governance has no relevance to trust" },
        ],
        explanation: "Data handling practices directly affect the trust clients place in a house when sharing sensitive personal and financial information.",
      },
      {
        prompt: "Why should a director read and understand a third-party AI tool's terms of use before adoption?",
        options: [
          { text: "Terms of use are always identical across every AI tool" },
          { text: "Terms vary considerably in what rights they claim over submitted data", correct: true },
          { text: "Terms of use only matter for free tools" },
          { text: "Reading terms of use is legally unnecessary" },
        ],
        explanation: "Different AI tools claim varying rights over submitted data, making due diligence on terms of use necessary before adopting a tool at scale.",
      },
      {
        prompt: "How does this chapter frame AI governance and ethics?",
        options: [
          { text: "As a one-time policy document requiring no further attention" },
          { text: "As an ongoing practice requiring periodic review as tools and uses evolve", correct: true },
          { text: "As solely the responsibility of an external vendor" },
          { text: "As irrelevant once initial data protections are in place" },
        ],
        explanation: "The chapter frames governance, transparency, and fairness as continuing obligations requiring ongoing attention, not a static, one-time policy.",
      },
    ],
  },
  {
    chapter: "VI",
    reading: [
      {
        heading: "Defining the mentor's scope",
        paragraphs: [
          "This capstone chapter walks through designing a private AI mentor tailored to a specific team's needs, beginning with a deliberately narrow scoping exercise: what specific questions or tasks should this mentor help with, product knowledge lookup, drafting practice, historical context, and equally important, what should it explicitly decline to do, such as making final client-facing claims about authenticity, value, or investment potential without human review.",
          "This scoping discipline reflects everything taught earlier in the Institute: a useful AI tool has clear, honest boundaries, and defining those boundaries before building anything is what separates a genuinely useful mentor from an over-scoped tool likely to produce the exact overconfident errors described in the opening chapter.",
        ],
      },
      {
        heading: "Building with guardrails",
        paragraphs: [
          "Practical construction of a private mentor involves configuring it with accurate, house-specific reference material, the kind of curriculum content and governance principles taught throughout this Academy, and explicit instructions to acknowledge uncertainty rather than guess when a question falls outside its verified reference material. Testing the mentor deliberately with edge cases and ambiguous questions, not just easy ones, reveals where its guardrails need strengthening before real team members rely on it.",
          "A one week build timeline is achievable specifically because the scope is kept narrow and the reference material is curated rather than open-ended; attempting a broader, unscoped assistant in the same timeframe would trade away exactly the reliability this chapter is trying to build.",
        ],
      },
      {
        heading: "Launch as the start of iteration, not the end",
        paragraphs: [
          "Shipping a private AI mentor to a team is the beginning of an ongoing process, not a completed deliverable: real usage will reveal gaps in reference material, edge cases the initial testing missed, and places where the mentor's tone or scope needs adjustment based on how the team actually uses it. A director should plan for this iteration explicitly rather than treating launch day as the finish line.",
          "As with every Institute in this Academy, completing this studio exercise and its associated knowledge check reflects disciplined engagement with the self-study curriculum, not a professional AI engineering certification, and any mentor built through this exercise should itself carry clear, honest disclosure of what it is and is not to the team using it, consistent with the Governance Charter this entire Academy is built on.",
        ],
      },
    ],
    takeaways: [
      "Designing a useful AI mentor begins with deliberately scoping what it should and should not do, before any building begins.",
      "Configuring the mentor with accurate, curated reference material and explicit instructions to acknowledge uncertainty prevents overconfident errors.",
      "Testing with edge cases and ambiguous questions, not just easy ones, reveals where guardrails need strengthening.",
      "Launching a private AI mentor is the beginning of ongoing iteration, not a completed, finished deliverable.",
    ],
    quiz: [
      {
        prompt: "Why does this chapter emphasise scoping the mentor's boundaries before building it?",
        options: [
          { text: "Scoping is a purely administrative step with no practical effect" },
          { text: "Clear, honest boundaries separate a genuinely useful mentor from an over-scoped tool prone to overconfident errors", correct: true },
          { text: "Scoping is only relevant for large teams" },
          { text: "Boundaries should be defined only after the mentor is already in use" },
        ],
        explanation: "Defining clear scope and explicit limits before building prevents the mentor from producing the kind of overconfident, unreliable output discussed earlier in the Institute.",
      },
      {
        prompt: "Why should the mentor be tested with edge cases and ambiguous questions, not just easy ones?",
        options: [
          { text: "Edge cases are unlikely to ever occur in real use" },
          { text: "Testing edge cases reveals where guardrails need strengthening before real reliance begins", correct: true },
          { text: "Easy questions are sufficient to validate any AI system" },
          { text: "Ambiguous questions cannot be meaningfully tested" },
        ],
        explanation: "Deliberately probing edge cases and ambiguity surfaces weaknesses in guardrails that easy questions alone would not reveal.",
      },
      {
        prompt: "How does this chapter frame the launch of a private AI mentor?",
        options: [
          { text: "As the completed, finished deliverable requiring no further work" },
          { text: "As the beginning of an ongoing process of iteration based on real usage", correct: true },
          { text: "As a one-time event with no need for future review" },
          { text: "As equivalent to a professional AI engineering certification" },
        ],
        explanation: "Launch reveals real gaps and edge cases that require ongoing iteration; it is a starting point, not a finished, static deliverable.",
      },
    ],
  },
];

export default artificialIntelligenceCurriculum;
