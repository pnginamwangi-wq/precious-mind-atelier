
# Full Read-Only Audit: The Precious Intelligence Academy

No files were modified. Findings are grouped by severity, then by page/component. Line references included where possible.

---

## CRITICAL (fix before any launch)

### Compliance / trust

1. **All 16 faculty members are fabricated names** (`src/data/institutes.ts` lines 52-54, 87-88, 121-122, 155-156, 189-190, 223-224, 257-258, 291-292). Presented as real people under "Taught by the people who set the standard" (`institutes.$slug.tsx:363`). Directly contradicts `governance.tsx:73` ("Professors, teachers, or employees are never fabricated"). Either replace with real named faculty or remove the section and relabel as illustrative.

2. **"Diploma" used 8 times in production data** (`src/data/institutes.ts` lines 64, 98, 132, 166, 200, 234, 268, 302). Rendered in every institute Philosophy block. Governance Article V (`governance.tsx:112-119`) explicitly forbids "Diploma", "Degree", "Licence", "Accredited". Change value to "Certificate of Completion, [Subject]". Also review the noun "Certification" / "Certifications" in `profile.tsx:29,244` and `institutes.index.tsx` meta description, which can imply accreditation.

3. **Privacy Policy has a literal placeholder as the contact address** (`src/routes/privacy.tsx:59`): `contactEmail: "privacy contact address to be published on this page"`. Rendered inside Article VIII. Must be replaced before the Privacy Policy is legally complete under the Australian Privacy Act.

### Broken navigation and dead UI

4. **Hero CTAs on the home page do nothing** (`src/routes/index.tsx:145-155`). Both "Explore the Academy" and "Meet the AI Mentor" LuxButtons have no onClick, wrapping Link, or href.

5. **AI Mentor "chat" widget is a decorative div** (`src/routes/index.tsx:426-443`). The "input" is a plain div, not an input element. The send button has no handler. Users will attempt to type and nothing happens.

6. **9 dead hash anchors in the global chrome** point to sections that do not exist anywhere: `#certifications` (footer:21), `#library` (footer:28, header:20, mobile-tabs:14), `#journal` (footer:27, header:21), `#glossary` (footer:29), `#downloads` (footer:30), `#about` (footer:37), `#faculty` (footer:38), `#contact` (footer:40). Home page only defines `#academy`, `#masterclasses`, `#mentor`.

7. **Social links are stubs** (`footer.tsx:47-50`): Instagram, LinkedIn, YouTube all `href="#"`.

8. **`ArrowLink` defaults to `href="#"`** (`button.tsx:54`). All five ScrollGallery "Study the object" links on the home page (`index.tsx:275`) fall back to `#`. Chapter/curriculum ArrowLinks also nest an `<a href="#">` inside a parent `<Link>`, producing invalid HTML.

### Accessibility

9. **4 pages have no `<h1>`** (SectionHeader renders its title as h2): `institutes.index.tsx`, `governance.tsx`, `privacy.tsx`, `terms.tsx`. Fails WCAG 1.3.1 / 2.4.6.

10. **8 instances of `<Link>` wrapping `<LuxButton>`** produce nested interactive `<a><button>` (invalid HTML): `index.tsx:322`, `institutes.$slug.tsx:119,248,253,404`, `institutes.$slug.chapters.$chapter.tsx:79,240`, `save-institute-button.tsx:58`. Fix by using an `asChild`/render-as pattern on LuxButton or replacing the button with a styled anchor.

11. **Auth page main lacks `id="main"`** (`auth.tsx:48`) so the global skip-to-content link in `__root.tsx:150` silently fails on that route.

12. **`<Footer />` rendered inside `<main>`** on `governance.tsx:359`, `terms.tsx:326`, and privacy. Loses the contentinfo landmark for AT users.

13. **Inquiry form and profile form Labels have no `htmlFor` / matching `id`** (`inquiry-form.tsx:190-205` and `profile.tsx:336-351`). Clicking labels does not focus inputs; screen readers do not announce the field name. Contrast: `auth.tsx` does this correctly.

14. **Cookie banner `role="dialog"`** lacks `aria-modal` and any focus trap (`cookie-notice.tsx:44-83`). `aria-live="polite"` on a dialog is contradictory. The settings dialog at line 86 has `aria-modal` but no focus trap.

15. **`text-platinum/40` at 10px** in the mobile menu nav numbers (`header.tsx:221`) fails WCAG AA contrast (~4.8:1 at large only, well below 4.5:1 at 10px).

16. **`text-platinum/50 text-xs` hint text** fails AA in `profile.tsx:349,372` and `inquiry-form.tsx:203` (~3.5:1 estimated).

---

## WARNING (visible degradation, fix soon)

### Design system integrity

17. **No tokenised type scale.** All font sizes are arbitrary pixel values (`text-[10px]` through `text-[17px]` and `text-[120px]`), scattered across `tokens.tsx`, every route, and editorial components. Introduce `--text-*` tokens or Tailwind theme extensions.

18. **`luxury.bodyMuted` conflated with inline overrides** creating no-op or silent overrides: `institutes.$slug.chapters.$chapter.tsx:166` puts `text-lg` before the token (loses); `index.tsx:195,202,208` puts `text-[16px] md:text-[17px]` after (silently wins over token).

19. **Six distinct tracking values** with no token per level: `[0.32em]`, `[0.28em]`, `[0.24em]`, `[0.2em]`, `[0.16em]`, `[0.3em]`, plus `tracking-wide`. Only `luxury.eyebrow` / `eyebrowMuted` capture two of them.

20. **404 and error components break the display-font reset** (`__root.tsx:27-28,55`) using `font-bold` / `font-semibold` and no `font-display`.

21. **`ChapterMark` title is a `<div>`, not a heading** (`editorial.tsx:262-265`) despite being styled and used as a section title in `editorial-example.tsx`.

22. **Hardcoded black surfaces bypass tokens.** `bg-black/30` and `bg-black/20` in `auth.tsx:66`, `profile.tsx:193,248,366`, `inquiry-form.tsx:83,108` should use charcoal/obsidian tokens (the warm dark palette).

23. **Hardcoded gold RGBA.** `rgba(212,175,55,0.12)` in `auth.tsx:49`; `rgba(200,164,93,0.6)` in `mobile-tabs.tsx:63`; `rgba(11,11,11,0.9)` (obsidian) in `institutes.$slug.tsx:220`. Should reference `--gold`, `--champagne`, `--obsidian` via `color-mix()`.

24. **Two button primitives with opposite rounding** coexist: `ui/button.tsx:8` uses `rounded-md`, `LuxButton` is square. `ui/card.tsx:9` uses `rounded-xl` vs the site-wide near-square `--radius: 0.25rem`. Shadcn `Button` and `Card` are unused in routes but represent contamination risk; consider removing or aligning.

25. **Four ad-hoc card patterns** with inconsistent border/background/backdrop-blur values across `profile.tsx:193,248,366`, `inquiry-form.tsx:82,108`, `index.tsx:374`. No luxury `Card` primitive. Extract one.

26. **Raw `<button>` bypassing LuxButton** with no focus ring: `inquiry-form.tsx:93-99` ("Submit another"), `auth.tsx:100-106` (mode toggle uses only `focus-visible:underline`, no ring).

### Content coverage

27. **Horology and Luxury Retail have no disclaimer** (`education-disclaimer.tsx:16-29`). Horology discusses second-market values, provenance, and authenticity: investment-adjacent per Governance Article XII. Add `horology` to `FINANCIAL_SLUGS` or introduce a provenance/valuation disclaimer kind.

28. **Profile stat cards show hardcoded zeroes and invented "Foundations" learning path** (`profile.tsx:242-244`). Values are static strings, never fetched.

29. **`/editorial-example` and `/visual/editorial-blocks`** are unguarded public routes with no noindex meta and no nav link (dev scaffolding exposed in production).

### Accessibility

30. **`FacultyOutcomes` has two sibling `<h2>` inside one section** (`institutes.$slug.tsx:362,387`).

31. **`<section>` landmarks have no accessible names** anywhere in the app.

32. **`text-platinum/60` at 13-14px font-light** is borderline (~4.2:1): `inquiry-form.tsx:116`, `institutes.$slug.tsx:374`, `privacy.tsx:333`, `governance.tsx:331`.

### Performance

33. **Hero LCP images lack `fetchpriority="high"`** on `index.tsx:91-97` and `institutes.$slug.tsx:211-218`.

34. **Above-the-fold `Vignette`/`Figure` images use `loading="lazy"`** unconditionally (`editorial.tsx:105`), delaying LCP in editorial routes.

---

## INFO (polish)

35. **`save-institute-button` and `inquiry-form` not exported from the luxury barrel** (`components/luxury/index.ts`); imported by direct path from routes.

36. **`bg-white/5` grid gaps** diverge from `--border` (white/8) across `index.tsx:296`, `institutes.index.tsx:49`, `institutes.$slug.tsx:313,459`, chapter route:265.

37. **`ui/input.tsx:11` base is `rounded-md`** and is always overridden to `rounded-none` in every form usage; move the default.

38. **Icon sizes vary** (`h-3.5`, `h-4`, `h-5`) across buttons, disclaimer icon, header, mobile tabs; no icon-size token.

39. **`font-light` (300) on all body copy** (`luxury.bodyMuted`) reduces effective legibility at 15px; consider `font-normal` for long-form article bodies.

40. **Google Fonts loaded via 3 families as blocking stylesheet** (`__root.tsx:108-113`). Consider preloading the LCP font variant or self-hosting.

41. **One marketing filler line**: "Curate how you appear across masterclasses, mentorships, and the certifications you will earn." (`profile.tsx:188`) also promises features not yet built. No em-dashes found in production files (only in the README code comment).

42. **Cross-route hash `#inquiry`** used from chapter to institute page (`institutes.$slug.chapters.$chapter.tsx:239`). Works today but silently breaks if renamed.

---

## PASS (verified clean)

- Auth flows: `auth.tsx` validation, OAuth error handling, `router.invalidate()` on redirect.
- InquiryForm: Zod validation, Supabase insert, success/error states, required attrs.
- `_authenticated/route.tsx` correctly uses `supabase.auth.getUser()` (validated JWT) for the route gate.
- No fake statistics, testimonials, awards, press logos, or "trusted by" claims found.
- No use of "degree", "bachelor", "master's", "PhD", "university", "accredited" in user-facing copy.
- Privacy Policy and Terms of Use exist as full routes.
- EducationDisclaimer is rendered on all institute pages, all chapter pages, and on the home Mentor section (with the horology/luxury-retail gap noted above).
- No duplicate Header/Footer/MobileTabs anywhere.
- Explicit `width`/`height` on all `<img>` audited (no CLS from missing dimensions).
- `MotionConfig reducedMotion="user"` at root; reduced-motion is honoured across nav and section rail.

---

## Suggested triage order

1. Item 1-3 (compliance): fake faculty, "Diploma", placeholder privacy contact.
2. Item 4-8 (broken UX): hero CTAs, fake AI chat, dead footer/header hash links, social stubs, ArrowLink default.
3. Item 9-16 (a11y critical): missing h1s, nested `<a><button>`, skip-link on auth, footer-in-main, form label association, cookie dialog semantics, low-contrast text.
4. Items 17-34 (warnings): type scale, colour tokens, ad-hoc cards, horology disclaimer, profile stat placeholders, unguarded dev routes, LCP hints.
5. Items 35-42 (info polish).

Say the word and I will implement the fixes in that order (or any subset you prefer).
