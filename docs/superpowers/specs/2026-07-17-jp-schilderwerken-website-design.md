# JP Schilderwerken website — design

## Context

Client: Justin Pothuizen, JP Schilderwerken (eenmanszaak), Houten. Schildersbedrijf
(binnen/buiten schilderwerk, houtrotreparaties, lak- en latexspuitwerk,
behangwerkzaamheden). Source material: client intake form (PDF) + logo files +
2 work photos + 3 reference sites the client likes for style
(hardemanschilderwerken.nl, vanmenkschilderwerken.nl — clean/modern
professional painting-contractor sites).

Domain, hosting, final huisstijlkleuren, budget and deadline are not yet
confirmed by the client (requested separately via WhatsApp). This spec covers
building the site itself; deployment is a separate, later step once
domain/hosting are known.

## Goal

A professional, modern, static 6-page Dutch-language business site that
looks trustworthy and drives contact/offerte requests, built so it can be
dropped onto any basic hosting once that's arranged.

## Pages

1. **Home** — hero, USP section (vakmanschap doorgegeven van vader op zoon,
   veilig werken, nette afwerking), diensten-teaser linking to Diensten,
   Google review CTA (existing review link), contact CTA.
2. **Over ons** — het verhaal van Justin en het bedrijf, wat het bedrijf
   anders maakt (uit intakeformulier).
3. **Diensten** — binnen schilderwerk, buiten schilderwerk,
   houtrotreparaties, lak- en latexspuitwerk, behangwerkzaamheden. No
   prices (none were given).
4. **Contact** — contact form, phone/email/address/openingstijden, link to
   Google review page.
5. **Privacy & Disclaimer** — one combined legal page, linked from the
   footer on every page.
6. Cookie consent banner — not a page, a site-wide bottom banner.

## Visual design

- Palette: logo orange (~`#E8622A`) as accent, neutral gray/white base
  (from logo's gray hexagon), matching client's own brief ("modern strak
  niet te veel poespas").
- Clean sans-serif type, card-based service sections, prominent CTA
  buttons ("Offerte aanvragen"), testimonial/review section — layout
  cues taken from the two reference sites (hero section, service cards,
  reviews, sticky/clear nav, strong footer with contact info).
- Imagery: real project photos are still pending from the client. Use the
  supplied door photo and scaffolding/banner photo as placeholders in the
  hero/gallery; structure the markup so photos are easy to swap later
  (single `assets/images/` folder, no hardcoded photo-specific layout
  logic).
- Fully responsive, mobile-first (local trade searches skew mobile).

## Technical approach

- Plain HTML/CSS/JS. No build step, no framework — deployable on any
  basic shared hosting once domain/hosting exist.
- 6 static HTML files with shared header/footer markup duplicated per
  page (no templating engine, per the "no build step" decision).
- One shared `styles.css` and one shared `main.js` (nav toggle, cookie
  banner logic, GA loader).
- **Contact form**: posts to Web3Forms (free, no backend). Requires an
  access key generated against `info@jp-schilderwerken.com` — placeholder
  key in code until that's generated.
- **Analytics**: Google Analytics (GA4), loaded only after cookie consent.
  Code ships with a placeholder measurement ID (`G-XXXXXXXXXX`) to be
  swapped once a real GA4 property exists.
- **Cookie consent**: bottom banner, Accepteren/Weigeren buttons, choice
  stored in `localStorage`; GA script is only injected after acceptance.
  Declining (or not yet choosing) means no GA script runs.
- **Privacy & Disclaimer page**: Dutch boilerplate covering the contact
  form (Web3Forms data handling), Google Analytics/cookies, and standard
  disclaimer content (aansprakelijkheid, geen garantie op content-juistheid,
  auteursrecht). Written generically since no legal review is in scope.

## Data flow

- Contact form → Web3Forms API → email delivered to
  `info@jp-schilderwerken.com`.
- Cookie banner → `localStorage` flag → gates whether the GA `<script>`
  tag is injected into the page.

## Out of scope / follow-ups (tracked separately, not part of this build)

- Actual domain name, registrar login, hosting decision — pending from
  client, needed before deploy.
- Real huisstijlkleuren hex codes — using logo-derived colors as
  placeholder until provided.
- Web3Forms access key — needs to be generated against the client's email.
- Real GA4 measurement ID — needs a GA4 property created.
- Remaining project photos — client is sorting these during vacation.
- Deployment itself (uploading to host, DNS, SSL) — separate step once
  domain/hosting are confirmed.

## Testing / verification

- Serve the site locally and open every page in a browser; verify nav,
  responsive breakpoints (mobile/tablet/desktop), and that all internal
  links resolve.
- Verify cookie banner: GA script does not load before consent, loads
  after "Accepteren", stays blocked after "Weigeren", choice persists on
  reload.
- Submit a test contact form entry and confirm the Web3Forms request
  fires correctly (will need a real access key to fully verify end-to-end).
