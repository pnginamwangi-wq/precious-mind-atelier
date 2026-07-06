import preciousMetals from "@/assets/institutes/precious-metals.jpg";
import bullion from "@/assets/institutes/bullion.jpg";
import numismatics from "@/assets/institutes/numismatics.jpg";
import gemstones from "@/assets/institutes/gemstones.jpg";
import jewellery from "@/assets/institutes/jewellery.jpg";
import horology from "@/assets/institutes/horology.jpg";
import luxuryRetail from "@/assets/institutes/luxury-retail.jpg";
import ai from "@/assets/institutes/artificial-intelligence.jpg";

export type CurriculumModule = {
  chapter: string;
  title: string;
  summary: string;
};

export type Institute = {
  slug: string;
  n: string;
  name: string;
  tag: string;
  hero: string;
  intro: string;
  philosophy: string;
  overline: string;
  curriculum: CurriculumModule[];
  faculty: { name: string; role: string }[];
  outcomes: string[];
  signature: { label: string; value: string }[];
};

export const INSTITUTES: Institute[] = [
  {
    slug: "precious-metals",
    n: "01",
    name: "Precious Metals",
    tag: "Gold. Silver. Platinum.",
    hero: preciousMetals,
    overline: "Institute of Precious Metals",
    intro:
      "From molten pour to hallmarked bar, understand the noble metals that have anchored civilisation, currency, and craft for four thousand years.",
    philosophy:
      "Gold, silver, and platinum are not commodities. They are memory in metal: the language of coronations, the collateral of nations, the surface of the finest jewellery on earth. The Institute studies these metals as materials, as markets, and as meaning.",
    curriculum: [
      { chapter: "I", title: "The Noble Metals", summary: "Geology, extraction, and refining from ore body to Good Delivery bar." },
      { chapter: "II", title: "Purity and Hallmarking", summary: "Assay methods, karat systems, and international hallmarking standards." },
      { chapter: "III", title: "Metallurgy for the Craftsperson", summary: "Alloys, casting, annealing, and the working properties of each metal." },
      { chapter: "IV", title: "Markets and Provenance", summary: "LBMA, COMEX, refiners of record, and the chain of custody for ethical sourcing." },
      { chapter: "V", title: "Recycling and Circularity", summary: "Urban mining, closed loop refining, and the economics of recovered metal." },
      { chapter: "VI", title: "Masterclass, The Pour", summary: "Live studio session with a Swiss refiner casting a one kilogram bar." },
    ],
    faculty: [
      { name: "Dr. Élise Reynard", role: "Refining Chemist, Geneva" },
      { name: "Marcus Aldenwood", role: "LBMA Good Delivery Assessor" },
      { name: "Yuki Tanabe", role: "Master Metallurgist, Kyoto" },
    ],
    outcomes: [
      "Read a certificate of assay with confidence.",
      "Advise clients on purity, provenance, and long term value.",
      "Speak fluently with refiners, jewellers, and bullion desks.",
    ],
    signature: [
      { label: "Duration", value: "12 weeks" },
      { label: "Format", value: "Studio, live sessions, private mentor" },
      { label: "Certification", value: "Diploma in Precious Metals" },
    ],
  },
  {
    slug: "bullion",
    n: "02",
    name: "Bullion",
    tag: "Bars. Coins. Markets.",
    hero: bullion,
    overline: "Institute of Bullion",
    intro:
      "The discipline of investment grade gold and silver: how bars and coins are produced, priced, stored, and traded across the world's most trusted vaults.",
    philosophy:
      "Bullion is where craft becomes capital. Behind every one ounce Britannia and every four hundred ounce Good Delivery bar sits a supply chain of refineries, mints, vaults, and market makers. The Institute demystifies this world for advisors, retailers, and private clients.",
    curriculum: [
      { chapter: "I", title: "Anatomy of a Bar", summary: "Cast, minted, and kilobar formats. Serial numbers, assay marks, and packaging." },
      { chapter: "II", title: "The World's Vaults", summary: "London, Zurich, Singapore, New York. Allocated versus unallocated storage." },
      { chapter: "III", title: "Spot, Premium, and Spread", summary: "How bullion is priced. Reading the fix and understanding retail markups." },
      { chapter: "IV", title: "Sovereign and Refiner Brands", summary: "PAMP, Valcambi, Perth Mint, Royal Canadian Mint. Trust, liquidity, and brand equity." },
      { chapter: "V", title: "Regulation and Risk", summary: "AML, KYC, counterfeit detection, and insured transport." },
      { chapter: "VI", title: "Client Advisory Practicum", summary: "Structuring a private bullion allocation from ten thousand to ten million." },
    ],
    faculty: [
      { name: "James Corvin", role: "Former Head of Precious Metals, Zurich" },
      { name: "Priya Rajan", role: "Director, Vault Operations Singapore" },
    ],
    outcomes: [
      "Structure and defend a bullion allocation.",
      "Authenticate bars and coins in the hand.",
      "Navigate premium, storage, and exit liquidity.",
    ],
    signature: [
      { label: "Duration", value: "10 weeks" },
      { label: "Format", value: "Live desks, vault visits, mentor" },
      { label: "Certification", value: "Diploma in Bullion" },
    ],
  },
  {
    slug: "numismatics",
    n: "03",
    name: "Numismatics",
    tag: "Rare and commemorative coinage.",
    hero: numismatics,
    overline: "Institute of Numismatics",
    intro:
      "The scholarship of coins: ancient, sovereign, and modern commemorative. Where history, art, and metal converge in a single object no larger than a thumbprint.",
    philosophy:
      "A coin is a portrait of a civilisation. Numismatics is the patient practice of listening to what it says. The Institute trains the eye, the hand, and the historical imagination required to grade, authenticate, and appraise the rarest coinage in the world.",
    curriculum: [
      { chapter: "I", title: "From Lydia to Now", summary: "A survey of coinage across two and a half millennia." },
      { chapter: "II", title: "Grading Standards", summary: "Sheldon scale, PCGS, NGC. The vocabulary of condition." },
      { chapter: "III", title: "Authentication", summary: "Die studies, weight and diameter, patina, and modern forensic tools." },
      { chapter: "IV", title: "Proof and Commemorative", summary: "Modern mint issues, series collecting, and the secondary market." },
      { chapter: "V", title: "Auctions and Appraisal", summary: "Reading catalogues, bidding strategy, and preparing a consignment." },
      { chapter: "VI", title: "Studio, Ten Coins", summary: "Hands on examination of ten significant coins from a private collection." },
    ],
    faculty: [
      { name: "Prof. Alessandro Vento", role: "Ancient Numismatist, Rome" },
      { name: "Charlotte Grieves", role: "Senior Cataloguer, London Auctions" },
    ],
    outcomes: [
      "Grade and authenticate coins with confidence.",
      "Curate and value a private numismatic collection.",
      "Represent clients at international auction.",
    ],
    signature: [
      { label: "Duration", value: "14 weeks" },
      { label: "Format", value: "Studio, auction houses, mentor" },
      { label: "Certification", value: "Diploma in Numismatics" },
    ],
  },
  {
    slug: "gemstones",
    n: "04",
    name: "Gemstones",
    tag: "Diamonds. Opals. Coloured stones.",
    hero: gemstones,
    overline: "Institute of Gemstones",
    intro:
      "The gemmological training expected of a house director: diamonds, coloured stones, and the great phenomenal gems, understood at the level of the loupe and the lab.",
    philosophy:
      "A gem is nature edited by the cutter's hand. To understand one is to hold geology, optics, and human judgement together in the same breath. The Institute trains you to see what most people miss, and to describe it with the precision of a laboratory report.",
    curriculum: [
      { chapter: "I", title: "The Four Cs, Reread", summary: "Colour, clarity, cut, carat, understood from the wholesaler's perspective." },
      { chapter: "II", title: "Coloured Stones", summary: "Ruby, sapphire, emerald, spinel. Origin, treatment, and market value." },
      { chapter: "III", title: "Phenomenal Gems", summary: "Opal, star sapphire, alexandrite, cat's eye. Reading the phenomenon." },
      { chapter: "IV", title: "Laboratory Practice", summary: "Refractometer, spectroscope, polariscope, and modern spectral tools." },
      { chapter: "V", title: "Ethics and Origin", summary: "Kimberley Process, responsible mining, and disclosure of treatments." },
      { chapter: "VI", title: "The Studio Loupe", summary: "Guided identification of fifty stones under expert supervision." },
    ],
    faculty: [
      { name: "Dr. Anwen Prys", role: "Gemmologist, FGA, DGA" },
      { name: "Rohan Malhotra", role: "Coloured Stone Dealer, Jaipur" },
    ],
    outcomes: [
      "Identify and grade gems in a professional setting.",
      "Interpret and issue gemmological reports.",
      "Advise on high value acquisitions and disclosure.",
    ],
    signature: [
      { label: "Duration", value: "16 weeks" },
      { label: "Format", value: "Laboratory, atelier, mentor" },
      { label: "Certification", value: "Diploma in Gemmology" },
    ],
  },
  {
    slug: "jewellery",
    n: "05",
    name: "Jewellery",
    tag: "Design. Craft. Provenance.",
    hero: jewellery,
    overline: "Institute of Jewellery",
    intro:
      "From bench to boutique: the design, craft, and cultural history of the jewellery that defines houses like Cartier, Boucheron, and JAR.",
    philosophy:
      "Jewellery gathers what the other Institutes teach: metal, gem, hand, and story. The Institute studies it as an art form and as a trade, honouring ateliers where a single piece can occupy a master for a thousand hours.",
    curriculum: [
      { chapter: "I", title: "A Short History of Adornment", summary: "From Egyptian gold to Belle Époque and beyond." },
      { chapter: "II", title: "Design and Gouache", summary: "The house drawing tradition, from concept to full colour rendering." },
      { chapter: "III", title: "At the Bench", summary: "Piercing, filing, soldering, and setting. Craft as physical vocabulary." },
      { chapter: "IV", title: "High Jewellery", summary: "The one of one piece: brief, stone selection, workshop, presentation." },
      { chapter: "V", title: "Provenance and Estate", summary: "Reading maker's marks, signed pieces, and the secondary market." },
      { chapter: "VI", title: "The Vitrine", summary: "Curating and presenting a capsule collection for a private client." },
    ],
    faculty: [
      { name: "Maître Colette Fournier", role: "Head of Atelier, Place Vendôme" },
      { name: "Sir Andrew Ellsworth", role: "Estate Jewellery Specialist" },
    ],
    outcomes: [
      "Read a piece of jewellery, front and back.",
      "Brief and evaluate atelier work.",
      "Curate a coherent, credible collection.",
    ],
    signature: [
      { label: "Duration", value: "14 weeks" },
      { label: "Format", value: "Atelier, drawing studio, mentor" },
      { label: "Certification", value: "Diploma in Jewellery" },
    ],
  },
  {
    slug: "horology",
    n: "06",
    name: "Horology",
    tag: "Swiss watchmaking, decoded.",
    hero: horology,
    overline: "Institute of Horology",
    intro:
      "The mechanical and cultural literacy required to speak fluently about haute horlogerie: complications, finissage, and the great manufactures of the Vallée de Joux.",
    philosophy:
      "A fine watch is a philosophical object: an argument about time made from three hundred moving parts. The Institute treats horology with the reverence it deserves and the clarity a client requires.",
    curriculum: [
      { chapter: "I", title: "The Movement", summary: "Escapement, mainspring, balance wheel. How a watch actually keeps time." },
      { chapter: "II", title: "Complications", summary: "Chronograph, perpetual calendar, tourbillon, minute repeater." },
      { chapter: "III", title: "Finissage", summary: "Côtes de Genève, anglage, black polish. The visual language of quality." },
      { chapter: "IV", title: "The Houses", summary: "Patek Philippe, Audemars Piguet, Vacheron Constantin, and the independents." },
      { chapter: "V", title: "Servicing and Provenance", summary: "Certificates, papers, and the second market that shapes true value." },
      { chapter: "VI", title: "Loupe Studio", summary: "Hands on examination of significant pieces from a private cabinet." },
    ],
    faculty: [
      { name: "Julien Beaumont", role: "Watchmaker, Vallée de Joux" },
      { name: "Isabelle Meier", role: "Auction Specialist, Geneva" },
    ],
    outcomes: [
      "Describe and defend a complication in plain language.",
      "Assess condition, service history, and authenticity.",
      "Speak with clients, dealers, and manufactures as a peer.",
    ],
    signature: [
      { label: "Duration", value: "12 weeks" },
      { label: "Format", value: "Bench visits, studio, mentor" },
      { label: "Certification", value: "Diploma in Horology" },
    ],
  },
  {
    slug: "luxury-retail",
    n: "07",
    name: "Luxury Retail",
    tag: "Clienteling and high value sales.",
    hero: luxuryRetail,
    overline: "Institute of Luxury Retail",
    intro:
      "The craft of the sale at the highest end: clienteling, storytelling, and the psychology of the seven figure transaction.",
    philosophy:
      "Luxury retail is not selling. It is stewardship. The Institute trains sales directors, boutique managers, and private client advisors to build relationships that outlast a single purchase and often, an entire career.",
    curriculum: [
      { chapter: "I", title: "The Boutique as Theatre", summary: "Space, light, scent, and the choreography of the visit." },
      { chapter: "II", title: "Clienteling", summary: "The CRM behind the curtain, and the human behind the CRM." },
      { chapter: "III", title: "Storytelling", summary: "Turning a piece into a narrative the client can carry home." },
      { chapter: "IV", title: "Objection and Silence", summary: "Handling price, provenance, and the pause before a decision." },
      { chapter: "V", title: "After the Sale", summary: "Aftercare, restoration, private previews, and lifetime value." },
      { chapter: "VI", title: "Simulation Studio", summary: "AI powered client roleplays with immediate coaching feedback." },
    ],
    faculty: [
      { name: "Nadine Achour", role: "Former Sales Director, Paris" },
      { name: "William Trask", role: "Private Client Consultant, Hong Kong" },
    ],
    outcomes: [
      "Lead a seven figure conversation with composure.",
      "Design a clienteling programme worth returning to.",
      "Train and coach a boutique team to your standard.",
    ],
    signature: [
      { label: "Duration", value: "8 weeks" },
      { label: "Format", value: "Roleplay studio, mentor, boutique visits" },
      { label: "Certification", value: "Diploma in Luxury Retail" },
    ],
  },
  {
    slug: "artificial-intelligence",
    n: "08",
    name: "Artificial Intelligence",
    tag: "AI for the luxury industry.",
    hero: ai,
    overline: "Institute of Artificial Intelligence",
    intro:
      "How to think with, and about, artificial intelligence as a leader in a luxury house. Fluency without hype, applied to the problems only your industry faces.",
    philosophy:
      "The luxury industry has always adopted the finest tools available, from the loupe to the laser. AI is the next such tool. The Institute frames it plainly: what it can do for a maison, what it cannot, and how to deploy it with the same taste that governs every other decision.",
    curriculum: [
      { chapter: "I", title: "Foundations", summary: "How modern models work, in language a director can trust." },
      { chapter: "II", title: "Authenticity and Provenance", summary: "Vision models for gem, hallmark, and watch verification." },
      { chapter: "III", title: "Clienteling Intelligence", summary: "Private, on brand assistants for advisors and directors." },
      { chapter: "IV", title: "Creative Ateliers", summary: "AI as a design partner, from moodboard to gouache." },
      { chapter: "V", title: "Governance", summary: "Data, IP, and the ethics of AI inside a house of taste." },
      { chapter: "VI", title: "Studio, Build a Mentor", summary: "Ship a private AI mentor tailored to your team, in one week." },
    ],
    faculty: [
      { name: "Dr. Hana Voss", role: "Applied AI Researcher, Zurich" },
      { name: "Rafael Mendes", role: "Digital Director, luxury conglomerate" },
    ],
    outcomes: [
      "Lead an AI programme inside a maison with clarity.",
      "Evaluate vendors and models without being sold to.",
      "Design and deploy a private AI mentor for your team.",
    ],
    signature: [
      { label: "Duration", value: "10 weeks" },
      { label: "Format", value: "Studio, mentor, house residencies" },
      { label: "Certification", value: "Diploma in Applied AI for Luxury" },
    ],
  },
];

export function getInstitute(slug: string): Institute | undefined {
  return INSTITUTES.find((i) => i.slug === slug);
}

/** Turns a chapter's roman numeral (e.g. "IV") into a URL-safe slug ("iv"). */
export function chapterSlug(chapter: string): string {
  return chapter.trim().toLowerCase();
}

export function getChapter(
  instituteSlug: string,
  chapter: string,
): { institute: Institute; module: CurriculumModule; index: number } | undefined {
  const institute = getInstitute(instituteSlug);
  if (!institute) return undefined;
  const index = institute.curriculum.findIndex(
    (m) => chapterSlug(m.chapter) === chapter.toLowerCase(),
  );
  if (index === -1) return undefined;
  return { institute, module: institute.curriculum[index], index };
}

