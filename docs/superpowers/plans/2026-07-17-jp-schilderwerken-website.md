# JP Schilderwerken Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, 6-page Dutch-language business website for JP Schilderwerken (painting contractor) that is professional, modern, mobile-responsive, has a working contact form, and a real cookie-consent-gated Google Analytics setup.

**Architecture:** Plain HTML/CSS/JS, no build step, no framework. Six static HTML files share one `css/styles.css` and one `js/main.js`. Header/footer markup is duplicated per page (deliberate choice — see spec). Contact form posts to Web3Forms. GA4 script is injected by JS only after cookie consent.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox/grid), vanilla JS (no dependencies), Web3Forms (contact form backend), Google Analytics GA4 (analytics, consent-gated).

## Global Constraints

- No build step, no npm dependencies, no framework — everything must run by opening the HTML files directly or serving them as static files. (Spec: Technical approach)
- No prices on the Diensten page — none were given by the client. (Spec: Pages §3)
- All visible site copy is in Dutch. (Spec: Context)
- Palette: logo orange `#E8622A` as accent, neutral gray/white base; these are placeholders until the client sends real huisstijlkleuren hex codes. (Spec: Visual design)
- GA4 measurement ID and Web3Forms access key ship as clearly-marked placeholders (`G-XXXXXXXXXX`, `YOUR_WEB3FORMS_ACCESS_KEY`) — real values are pending external setup, not part of this build. (Spec: Out of scope)
- No automated test framework is introduced (would contradict the "no build step" decision). Every task's "test" step is a precise manual browser verification using a local static server, with exact URLs and exact expected results.
- UPDATE (post-Task-1): the client's real logo and two work photos were located on disk and added to `assets/images/` (`logo.png`, `logo-dark.png`, `logo-mark.png`, `werk-deur.jpg`, `werk-spandoek.jpg`). The header logo reference is `assets/images/logo.png` (not the originally-planned hand-built `logo.svg`, which still exists in the repo but is unused) in every task's header markup below. The Home page's "Ons werk" section now uses `werk-deur.jpg`/`werk-spandoek.jpg` via the `.work-photo` CSS class instead of `.placeholder-photo`. Remaining project photos are still being sorted by the client during his vacation — continue using `.placeholder-photo` blocks for any further imagery not yet supplied.

---

## File Structure

```
jp-schilderwerken-website/
  index.html          Home
  over-ons.html        Over ons
  diensten.html         Diensten
  contact.html          Contact (form)
  privacy.html           Privacy & Disclaimer
  css/
    styles.css          Shared design tokens, layout, components, responsive rules
  js/
    main.js             Nav toggle, cookie consent banner + GA loader, contact form handler
  assets/
    images/
      logo.svg          Hand-built inline-style SVG recreation of the JP Schilderwerken logo
```

---

### Task 1: Shared styles + Home page

**Files:**
- Create: `css/styles.css`
- Create: `assets/images/logo.svg`
- Create: `index.html`

**Interfaces:**
- Produces: CSS custom properties consumed by every later page — `--color-primary`, `--color-primary-dark`, `--color-dark`, `--color-gray`, `--color-light-gray`, `--color-white`, `--font-family`, `--container-width`, `--radius`, `--shadow`. Also produces shared component classes every later page reuses: `.site-header`, `.nav`, `.nav-toggle`, `.btn`, `.btn-primary`, `.btn-outline`, `.card`, `.section`, `.section-alt`, `.footer`, `.usp-grid`, `.placeholder-photo`.
- Produces: shared header/footer HTML block (copy verbatim into every later page, only the `aria-current` link and active nav class change).

- [ ] **Step 1: Create `css/styles.css`**

```css
:root {
  --color-primary: #E8622A;
  --color-primary-dark: #C94E1D;
  --color-dark: #2E2E2E;
  --color-gray: #6B6B6B;
  --color-light-gray: #F5F5F5;
  --color-white: #FFFFFF;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --container-width: 1140px;
  --radius: 8px;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  color: var(--color-dark);
  line-height: 1.6;
  background: var(--color-white);
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header / nav */
.site-header {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-light-gray);
  position: sticky;
  top: 0;
  z-index: 100;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-link img {
  height: 40px;
  width: auto;
}

.logo-link:hover {
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav a {
  color: var(--color-dark);
  font-weight: 600;
  font-size: 0.95rem;
}

.nav a:hover,
.nav a[aria-current="page"] {
  color: var(--color-primary);
  text-decoration: none;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  color: var(--color-dark);
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.85rem 1.75rem;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  border: 2px solid transparent;
  text-decoration: none !important;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
}

.btn-outline {
  background: transparent;
  border-color: var(--color-white);
  color: var(--color-white);
}

.btn-outline:hover {
  background: var(--color-white);
  color: var(--color-dark);
}

/* Hero */
.hero {
  background: var(--color-dark);
  color: var(--color-white);
  padding: 5rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.15rem;
  color: #D8D8D8;
  max-width: 640px;
  margin: 0 auto 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Sections */
.section {
  padding: 4rem 0;
}

.section-alt {
  background: var(--color-light-gray);
}

.section h2 {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.section-intro {
  text-align: center;
  color: var(--color-gray);
  max-width: 640px;
  margin: 0 auto 2.5rem;
}

/* USP grid */
.usp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.usp-card {
  text-align: center;
  padding: 1.5rem;
}

.usp-card .usp-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.usp-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
}

.usp-card p {
  color: var(--color-gray);
  font-size: 0.95rem;
}

/* Cards (diensten teaser / diensten page) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.card {
  background: var(--color-white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.75rem;
}

.card h3 {
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.card p {
  color: var(--color-gray);
  font-size: 0.95rem;
}

/* Placeholder photo blocks (real photos pending from client) */
.placeholder-photo {
  background: linear-gradient(135deg, var(--color-light-gray) 0%, #E3E3E3 100%);
  border: 2px dashed #C9C9C9;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  font-size: 0.9rem;
  font-weight: 600;
  min-height: 260px;
  text-align: center;
  padding: 1rem;
}

/* Review CTA */
.review-cta {
  background: var(--color-primary);
  color: var(--color-white);
  text-align: center;
  padding: 3rem 0;
}

.review-cta h2 {
  margin-bottom: 1rem;
}

.review-cta .btn-outline {
  border-color: var(--color-white);
}

/* Footer */
.footer {
  background: var(--color-dark);
  color: #C9C9C9;
  padding: 3rem 0 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer h3 {
  color: var(--color-white);
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
}

.footer a {
  color: #C9C9C9;
}

.footer-bottom {
  border-top: 1px solid #4A4A4A;
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
}

/* Cookie consent banner */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-dark);
  color: var(--color-white);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 1000;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.2);
}

.cookie-banner p {
  flex: 1;
  min-width: 240px;
  font-size: 0.9rem;
}

.cookie-banner p a {
  color: var(--color-primary);
}

.cookie-actions {
  display: flex;
  gap: 0.75rem;
}

.cookie-actions button {
  border-radius: var(--radius);
  padding: 0.6rem 1.25rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  border: 2px solid var(--color-white);
}

#cookie-accept {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

#cookie-decline {
  background: transparent;
  color: var(--color-white);
}

.hidden {
  display: none !important;
}

/* Responsive */
@media (max-width: 800px) {
  .nav {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--color-white);
    flex-direction: column;
    gap: 0;
    border-bottom: 1px solid var(--color-light-gray);
    display: none;
  }

  .nav.nav-open {
    display: flex;
  }

  .nav li {
    border-top: 1px solid var(--color-light-gray);
  }

  .nav a {
    display: block;
    padding: 1rem 1.5rem;
  }

  .nav-toggle {
    display: block;
  }

  .usp-grid,
  .card-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 1.85rem;
  }
}
```

- [ ] **Step 2: Create `assets/images/logo.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100" width="320" height="100" role="img" aria-label="JP Schilderwerken logo">
  <polygon points="45,8 80,28 80,68 45,88 10,68 10,28"
           fill="none" stroke="#6B6B6B" stroke-width="6"/>
  <text x="30" y="63" font-family="-apple-system, Arial, sans-serif" font-weight="700" font-size="34" fill="#E8622A">J</text>
  <text x="50" y="63" font-family="-apple-system, Arial, sans-serif" font-weight="700" font-size="34" fill="#6B6B6B">P</text>
  <line x1="100" y1="20" x2="100" y2="80" stroke="#6B6B6B" stroke-width="2"/>
  <text x="115" y="58" font-family="-apple-system, Arial, sans-serif" font-weight="700" font-size="28" fill="#E8622A">Schilderwerken</text>
</svg>
```

- [ ] **Step 3: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JP Schilderwerken | Schilderwerk in en om uw woning of bedrijfspand</title>
  <meta name="description" content="JP Schilderwerken uit Houten: binnen- en buitenschilderwerk, houtrotreparaties, lak- en latexspuitwerk en behangwerkzaamheden. Vraag vrijblijvend een offerte aan.">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo-link">
        <img src="assets/images/logo.png" alt="JP Schilderwerken logo">
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu openen" aria-expanded="false">&#9776;</button>
      <ul class="nav" id="nav">
        <li><a href="index.html" aria-current="page">Home</a></li>
        <li><a href="over-ons.html">Over ons</a></li>
        <li><a href="diensten.html">Diensten</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Vakkundig schilderwerk in en om uw woning of bedrijfspand</h1>
      <p>JP Schilderwerken uit Houten staat voor nette afwerking, veilig werken en persoonlijk contact &mdash; van binnenschilderwerk tot houtrotreparatie.</p>
      <div class="hero-actions">
        <a href="contact.html" class="btn btn-primary">Offerte aanvragen</a>
        <a href="diensten.html" class="btn btn-outline">Bekijk diensten</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Waarom JP Schilderwerken</h2>
      <p class="section-intro">Het vak is mij door mijn vader doorgegeven &mdash; met liefde voor het ambacht en aandacht voor ieder detail.</p>
      <div class="usp-grid">
        <div class="usp-card">
          <div class="usp-icon">&#128119;</div>
          <h3>Vakmanschap van vader op zoon</h3>
          <p>Het schildersvak, inclusief alle finesses, is mij persoonlijk overgedragen.</p>
        </div>
        <div class="usp-card">
          <div class="usp-icon">&#9989;</div>
          <h3>Veilig werken</h3>
          <p>Elk project wordt veilig en zorgvuldig uitgevoerd, van steiger tot afwerking.</p>
        </div>
        <div class="usp-card">
          <div class="usp-icon">&#10024;</div>
          <h3>Nette afwerking</h3>
          <p>Een strak en net eindresultaat staat bij elk project voorop.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Onze diensten</h2>
      <p class="section-intro">Van binnenschilderwerk tot houtrotreparatie &mdash; alles onder één dak.</p>
      <div class="card-grid">
        <div class="card">
          <h3>Binnen- en buitenschilderwerk</h3>
          <p>Vakkundig geschilderd, binnen en buiten, voor een fris en duurzaam resultaat.</p>
        </div>
        <div class="card">
          <h3>Houtrotreparaties</h3>
          <p>Houtrot vakkundig hersteld, zodat uw kozijnen en gevel weer jaren mee kunnen.</p>
        </div>
        <div class="card">
          <h3>Lak- en latexspuitwerk</h3>
          <p>Een strakke, egale afwerking dankzij professioneel spuitwerk.</p>
        </div>
        <div class="card">
          <h3>Behangwerkzaamheden</h3>
          <p>Netjes behangen, van voorbereiding tot de laatste baan.</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:2rem;">
        <a href="diensten.html" class="btn btn-primary">Alle diensten bekijken</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Ons werk</h2>
      <p class="section-intro">Een impressie van recent afgerond werk. Meer foto's volgen binnenkort.</p>
      <div class="card-grid">
        <div class="placeholder-photo">Foto: afgerond schilderwerk<br>(volgt)</div>
        <div class="placeholder-photo">Foto: JP Schilderwerken aan het werk<br>(volgt)</div>
      </div>
    </div>
  </section>

  <section class="review-cta">
    <div class="container">
      <h2>Wat klanten zeggen</h2>
      <p>Bekijk onze klantervaringen op Google of deel uw eigen ervaring.</p>
      <a href="https://g.page/r/Cd4bdeo8upZgEBM/review" class="btn btn-outline" target="_blank" rel="noopener">Bekijk Google reviews</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>JP Schilderwerken</h3>
          <p>Molenaarserf 57<br>3991 KR Houten</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href="tel:+31642038702">06 42 03 87 02</a><br>
          <a href="mailto:info@jp-schilderwerken.com">info@jp-schilderwerken.com</a></p>
        </div>
        <div>
          <h3>Openingstijden</h3>
          <p>Ma &ndash; Vr: 08:00 &ndash; 16:00</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 JP Schilderwerken. <a href="privacy.html">Privacy &amp; disclaimer</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verify Home page renders correctly**

Run: `npx --yes serve -l 8000 .` (from the project root, leave running)

Open `http://localhost:8000/index.html` in a browser.

Expected:
- Header shows the logo, "Home" is highlighted orange, nav links present
- Hero section shows dark background, headline, and two buttons
- USP, Diensten teaser, "Ons werk" placeholder blocks, review CTA (orange band), and footer all render
- Resize the browser to ~375px wide: nav links disappear and a &#9776; menu button appears (button won't be functional yet — that's Task 7)
- No console errors in devtools (F12 → Console)

- [ ] **Step 5: Commit**

```bash
git add css/styles.css assets/images/logo.svg index.html
git commit -m "Add shared styles, logo, and home page"
```

---

### Task 2: Over ons page

**Files:**
- Create: `over-ons.html`

**Interfaces:**
- Consumes: `css/styles.css` classes from Task 1 (`.site-header`, `.nav`, `.hero`, `.section`, `.footer`, etc.), `assets/images/logo.svg`.

- [ ] **Step 1: Create `over-ons.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Over ons | JP Schilderwerken</title>
  <meta name="description" content="Maak kennis met JP Schilderwerken uit Houten: een schildersbedrijf met vakmanschap dat van vader op zoon is doorgegeven.">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo-link">
        <img src="assets/images/logo.png" alt="JP Schilderwerken logo">
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu openen" aria-expanded="false">&#9776;</button>
      <ul class="nav" id="nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="over-ons.html" aria-current="page">Over ons</a></li>
        <li><a href="diensten.html">Diensten</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Over JP Schilderwerken</h1>
      <p>Vakmanschap, persoonlijk contact en een net eindresultaat &mdash; dat is waar ik voor sta.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Mijn verhaal</h2>
      <p class="section-intro">
        Het schildersvak is mij door mijn vader doorgegeven. Hij heeft mij niet alleen de techniek geleerd,
        maar vooral ook de liefde voor het ambacht overgedragen. Van de omgang met klanten tot veilig werken
        op de steiger, tot het afleveren van een net stukje schilderwerk &mdash; ieder aspect van het vak heb
        ik met aandacht geleerd en pas ik dagelijks toe.
      </p>
      <p class="section-intro">
        Als eenmanszaak werk ik voor particuliere en zakelijke klanten in en rond Houten, aan alles wat met
        schilderwerk te maken heeft in en om uw woning of bedrijfspand.
      </p>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Waar ik voor sta</h2>
      <div class="usp-grid">
        <div class="usp-card">
          <div class="usp-icon">&#128119;</div>
          <h3>Doorgegeven vakmanschap</h3>
          <p>Techniek en liefde voor het vak, geleerd van mijn vader.</p>
        </div>
        <div class="usp-card">
          <div class="usp-icon">&#129309;</div>
          <h3>Persoonlijk contact</h3>
          <p>Heldere afspraken en een aanspreekpunt gedurende het hele project.</p>
        </div>
        <div class="usp-card">
          <div class="usp-icon">&#9989;</div>
          <h3>Veilig en netjes werken</h3>
          <p>Van steigerwerk tot de laatste verfstreek: veilig en zorgvuldig.</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>JP Schilderwerken</h3>
          <p>Molenaarserf 57<br>3991 KR Houten</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href="tel:+31642038702">06 42 03 87 02</a><br>
          <a href="mailto:info@jp-schilderwerken.com">info@jp-schilderwerken.com</a></p>
        </div>
        <div>
          <h3>Openingstijden</h3>
          <p>Ma &ndash; Vr: 08:00 &ndash; 16:00</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 JP Schilderwerken. <a href="privacy.html">Privacy &amp; disclaimer</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify page**

With the local server from Task 1 still running, open `http://localhost:8000/over-ons.html`.

Expected:
- "Over ons" nav link is highlighted orange
- Hero, verhaal section, and "Waar ik voor sta" USP grid render correctly
- Footer and links match Home page

- [ ] **Step 3: Commit**

```bash
git add over-ons.html
git commit -m "Add over-ons page"
```

---

### Task 3: Diensten page

**Files:**
- Create: `diensten.html`

**Interfaces:**
- Consumes: same shared classes as Task 2.

- [ ] **Step 1: Create `diensten.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Diensten | JP Schilderwerken</title>
  <meta name="description" content="Binnen- en buitenschilderwerk, houtrotreparaties, lak- en latexspuitwerk en behangwerkzaamheden door JP Schilderwerken uit Houten.">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo-link">
        <img src="assets/images/logo.png" alt="JP Schilderwerken logo">
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu openen" aria-expanded="false">&#9776;</button>
      <ul class="nav" id="nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="over-ons.html">Over ons</a></li>
        <li><a href="diensten.html" aria-current="page">Diensten</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Onze diensten</h1>
      <p>Alles wat met schilderwerk te maken heeft in en om uw woning of bedrijfspand.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="card-grid">
        <div class="card">
          <h3>Binnenschilderwerk</h3>
          <p>Wanden, plafonds, kozijnen en deuren vakkundig geschilderd voor een frisse, strakke afwerking binnenshuis.</p>
        </div>
        <div class="card">
          <h3>Buitenschilderwerk</h3>
          <p>Gevels, kozijnen en houtwerk beschermd en verfraaid met duurzaam buitenschilderwerk.</p>
        </div>
        <div class="card">
          <h3>Houtrotreparaties</h3>
          <p>Aangetast hout vakkundig hersteld of vervangen, zodat kozijnen en gevel weer jaren meegaan.</p>
        </div>
        <div class="card">
          <h3>Lak- en latexspuitwerk</h3>
          <p>Een strakke, egale afwerking op deuren, kozijnen en meubels dankzij professioneel spuitwerk.</p>
        </div>
        <div class="card">
          <h3>Behangwerkzaamheden</h3>
          <p>Van voorbereiding van de ondergrond tot de laatste baan: netjes en vakkundig behangen.</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:2.5rem;">
        <a href="contact.html" class="btn btn-primary">Vraag een offerte aan</a>
      </div>
    </div>
  </section>
</body>
</html>
```

Note: this page is missing the `<footer>` and `js/main.js` include by design of this step — Step 2 catches that.

- [ ] **Step 2: Add footer and script include, matching other pages**

Replace the closing `</body>\n</html>` in `diensten.html` with:

```html
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>JP Schilderwerken</h3>
          <p>Molenaarserf 57<br>3991 KR Houten</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href="tel:+31642038702">06 42 03 87 02</a><br>
          <a href="mailto:info@jp-schilderwerken.com">info@jp-schilderwerken.com</a></p>
        </div>
        <div>
          <h3>Openingstijden</h3>
          <p>Ma &ndash; Vr: 08:00 &ndash; 16:00</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 JP Schilderwerken. <a href="privacy.html">Privacy &amp; disclaimer</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify page**

Open `http://localhost:8000/diensten.html`.

Expected:
- "Diensten" nav link highlighted orange
- Five service cards render in a 2-column grid (1 column on mobile width)
- Footer present and matches other pages, "Offerte aanvragen" button links to contact.html

- [ ] **Step 4: Commit**

```bash
git add diensten.html
git commit -m "Add diensten page"
```

---

### Task 4: Contact page with Web3Forms

**Files:**
- Create: `contact.html`
- Modify: `js/main.js` (create if it doesn't exist yet — first page needing JS logic)

**Interfaces:**
- Produces: `js/main.js` function `initContactForm()` — reads `document.getElementById('contact-form')`, if present attaches a `submit` listener that POSTs to Web3Forms and shows `#form-status`. Later tasks (Task 6) add to this same file without touching `initContactForm`.
- Consumes: none beyond shared CSS classes.

- [ ] **Step 1: Create `contact.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact | JP Schilderwerken</title>
  <meta name="description" content="Neem contact op met JP Schilderwerken uit Houten voor een vrijblijvende offerte.">
  <link rel="stylesheet" href="css/styles.css">
  <style>
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-weight: 600; margin-bottom: 0.4rem; font-size: 0.9rem; }
    .form-group input, .form-group textarea {
      width: 100%; padding: 0.75rem; border: 1px solid #C9C9C9; border-radius: var(--radius);
      font-family: var(--font-family); font-size: 0.95rem;
    }
    .form-group textarea { min-height: 140px; resize: vertical; }
    #form-status { margin-top: 1rem; font-weight: 600; }
    #form-status.success { color: #1E7A34; }
    #form-status.error { color: #B3261E; }
    .contact-info-list { list-style: none; margin-top: 1rem; }
    .contact-info-list li { margin-bottom: 0.75rem; }
    @media (max-width: 800px) {
      .contact-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo-link">
        <img src="assets/images/logo.png" alt="JP Schilderwerken logo">
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu openen" aria-expanded="false">&#9776;</button>
      <ul class="nav" id="nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="over-ons.html">Over ons</a></li>
        <li><a href="diensten.html">Diensten</a></li>
        <li><a href="contact.html" aria-current="page">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Contact</h1>
      <p>Vraag vrijblijvend een offerte aan of stel uw vraag &mdash; we reageren zo snel mogelijk.</p>
    </div>
  </section>

  <section class="section">
    <div class="container contact-grid">
      <div>
        <h2 style="text-align:left; margin-bottom:1.5rem;">Stuur een bericht</h2>
        <form id="contact-form">
          <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
          <input type="checkbox" name="botcheck" class="hidden" style="display:none">
          <div class="form-group">
            <label for="name">Naam</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">E-mailadres</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="phone">Telefoonnummer</label>
            <input type="tel" id="phone" name="phone">
          </div>
          <div class="form-group">
            <label for="message">Bericht</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Versturen</button>
          <p id="form-status"></p>
        </form>
      </div>
      <div>
        <h2 style="text-align:left; margin-bottom:1.5rem;">Gegevens</h2>
        <ul class="contact-info-list">
          <li><strong>Adres</strong><br>Molenaarserf 57, 3991 KR Houten</li>
          <li><strong>Telefoon</strong><br><a href="tel:+31642038702">06 42 03 87 02</a></li>
          <li><strong>E-mail</strong><br><a href="mailto:info@jp-schilderwerken.com">info@jp-schilderwerken.com</a></li>
          <li><strong>Openingstijden</strong><br>Ma &ndash; Vr: 08:00 &ndash; 16:00</li>
          <li><strong>Google reviews</strong><br><a href="https://g.page/r/Cd4bdeo8upZgEBM/review" target="_blank" rel="noopener">Deel of bekijk een review</a></li>
        </ul>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>JP Schilderwerken</h3>
          <p>Molenaarserf 57<br>3991 KR Houten</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href="tel:+31642038702">06 42 03 87 02</a><br>
          <a href="mailto:info@jp-schilderwerken.com">info@jp-schilderwerken.com</a></p>
        </div>
        <div>
          <h3>Openingstijden</h3>
          <p>Ma &ndash; Vr: 08:00 &ndash; 16:00</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 JP Schilderwerken. <a href="privacy.html">Privacy &amp; disclaimer</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `js/main.js` with `initContactForm()`**

```javascript
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    status.textContent = 'Bezig met versturen...';
    status.className = '';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        status.textContent = 'Bedankt! Uw bericht is verstuurd, we nemen zo snel mogelijk contact op.';
        status.className = 'success';
        form.reset();
      } else {
        status.textContent = 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.';
        status.className = 'error';
      }
    } catch (err) {
      status.textContent = 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.';
      status.className = 'error';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
});
```

- [ ] **Step 3: Verify the form behaves correctly with the placeholder key**

Open `http://localhost:8000/contact.html`.

Expected:
- Form renders with Naam/E-mail/Telefoon/Bericht fields
- Try submitting with Naam and E-mail and Bericht filled in: status text changes to "Bezig met versturen..." then, because `YOUR_WEB3FORMS_ACCESS_KEY` is a placeholder, Web3Forms will respond with `success: false` — confirm the red "Er ging iets mis..." message appears (this confirms the fetch/response-handling logic works; it will start succeeding once a real access key is dropped in per the Out of scope note in the spec)
- Try submitting with empty required fields: the browser's native validation should block submission (red outline / "Vul dit veld in" tooltip)

- [ ] **Step 4: Commit**

```bash
git add contact.html js/main.js
git commit -m "Add contact page with Web3Forms-backed contact form"
```

---

### Task 5: Privacy & Disclaimer page

**Files:**
- Create: `privacy.html`

**Interfaces:**
- Consumes: shared CSS classes from Task 1.

- [ ] **Step 1: Create `privacy.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy &amp; disclaimer | JP Schilderwerken</title>
  <meta name="description" content="Privacyverklaring en disclaimer van JP Schilderwerken.">
  <link rel="stylesheet" href="css/styles.css">
  <style>
    .legal-content h2 { text-align: left; font-size: 1.3rem; margin: 2rem 0 0.75rem; }
    .legal-content p, .legal-content li { color: var(--color-gray); margin-bottom: 0.75rem; }
    .legal-content ul { padding-left: 1.25rem; }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo-link">
        <img src="assets/images/logo.png" alt="JP Schilderwerken logo">
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu openen" aria-expanded="false">&#9776;</button>
      <ul class="nav" id="nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="over-ons.html">Over ons</a></li>
        <li><a href="diensten.html">Diensten</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Privacy &amp; disclaimer</h1>
    </div>
  </section>

  <section class="section">
    <div class="container legal-content" style="max-width:800px;">
      <h2>Privacyverklaring</h2>
      <p>JP Schilderwerken, gevestigd aan Molenaarserf 57, 3991 KR Houten, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven op deze website.</p>

      <h2>Welke gegevens verwerken wij</h2>
      <ul>
        <li>Naam, e-mailadres, telefoonnummer en berichtinhoud die u zelf invult via het contactformulier.</li>
        <li>Anonieme bezoekstatistieken via Google Analytics, alleen nadat u hiervoor toestemming heeft gegeven via de cookiemelding.</li>
      </ul>

      <h2>Contactformulier</h2>
      <p>Berichten die via het contactformulier worden verstuurd, worden verwerkt door de formulierdienst Web3Forms en per e-mail bezorgd bij info@jp-schilderwerken.com. Deze gegevens worden alleen gebruikt om uw aanvraag te beantwoorden en niet gedeeld met derden voor andere doeleinden.</p>

      <h2>Cookies en Google Analytics</h2>
      <p>Deze website gebruikt, na uw toestemming, Google Analytics om website-bezoek te analyseren. Google Analytics plaatst hiervoor cookies. U kunt uw toestemming altijd weigeren via de cookiemelding onderaan de pagina; de website blijft dan gewoon werken zonder deze cookies.</p>

      <h2>Uw rechten</h2>
      <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact op via info@jp-schilderwerken.com.</p>

      <h2>Disclaimer</h2>
      <ul>
        <li>Aan de inhoud van deze website is de grootst mogelijke zorg besteed, maar JP Schilderwerken kan niet instaan voor de volledige juistheid of actualiteit van alle informatie.</li>
        <li>Aan de inhoud van deze website kunnen geen rechten worden ontleend.</li>
        <li>Alle teksten, afbeeldingen en het logo op deze website zijn eigendom van JP Schilderwerken, tenzij anders vermeld, en mogen niet zonder toestemming worden overgenomen.</li>
        <li>JP Schilderwerken is niet aansprakelijk voor schade die voortvloeit uit het gebruik van deze website of het (tijdelijk) niet beschikbaar zijn ervan.</li>
      </ul>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>JP Schilderwerken</h3>
          <p>Molenaarserf 57<br>3991 KR Houten</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href="tel:+31642038702">06 42 03 87 02</a><br>
          <a href="mailto:info@jp-schilderwerken.com">info@jp-schilderwerken.com</a></p>
        </div>
        <div>
          <h3>Openingstijden</h3>
          <p>Ma &ndash; Vr: 08:00 &ndash; 16:00</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 JP Schilderwerken. <a href="privacy.html">Privacy &amp; disclaimer</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify page**

Open `http://localhost:8000/privacy.html`.

Expected:
- Page renders with all 6 sections (Privacyverklaring, Welke gegevens, Contactformulier, Cookies, Rechten, Disclaimer)
- Footer link "Privacy & disclaimer" on every other page (Home, Over ons, Diensten, Contact) navigates here correctly — click through from each page to confirm

- [ ] **Step 3: Commit**

```bash
git add privacy.html
git commit -m "Add privacy and disclaimer page"
```

---

### Task 6: Cookie consent banner + consent-gated Google Analytics

**Files:**
- Modify: `js/main.js`
- Modify: `index.html`, `over-ons.html`, `diensten.html`, `contact.html`, `privacy.html` (add cookie banner markup before `</body>` on all 5 pages)

**Interfaces:**
- Produces: `js/main.js` function `initCookieConsent()`, called alongside `initContactForm()` from the existing `DOMContentLoaded` listener. Reads/writes `localStorage.getItem('cookie-consent')` / `localStorage.setItem('cookie-consent', 'accepted' | 'declined')`. On `'accepted'` (either already stored, or just clicked), calls `loadGoogleAnalytics()`, which injects the GA4 script tag with measurement ID `G-XXXXXXXXXX` exactly once (guarded so it can't double-inject).

- [ ] **Step 1: Add cookie banner markup to every page**

Insert this immediately before the `<script src="js/main.js"></script>` line, in **all five** HTML files (`index.html`, `over-ons.html`, `diensten.html`, `contact.html`, `privacy.html`):

```html
  <div class="cookie-banner hidden" id="cookie-banner">
    <p>Wij gebruiken cookies voor bezoekstatistieken (Google Analytics). Zie onze <a href="privacy.html">privacyverklaring</a> voor meer info.</p>
    <div class="cookie-actions">
      <button id="cookie-decline">Weigeren</button>
      <button id="cookie-accept">Accepteren</button>
    </div>
  </div>

```

- [ ] **Step 2: Add cookie consent + GA loading logic to `js/main.js`**

Append this to `js/main.js`, and update the `DOMContentLoaded` listener at the bottom to also call `initCookieConsent()`:

```javascript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

function loadGoogleAnalytics() {
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');
  const stored = localStorage.getItem('cookie-consent');

  if (stored === 'accepted') {
    loadGoogleAnalytics();
  } else if (stored !== 'declined') {
    banner.classList.remove('hidden');
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.add('hidden');
    loadGoogleAnalytics();
  });

  declineBtn.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'declined');
    banner.classList.add('hidden');
  });
}
```

Update the bottom of `js/main.js` so the `DOMContentLoaded` listener reads:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  initCookieConsent();
});
```

- [ ] **Step 3: Verify consent gating end-to-end**

With the local server still running:

1. Open devtools (F12) → Application tab → Local Storage → `http://localhost:8000`, and delete the `cookie-consent` key if present.
2. Open `http://localhost:8000/index.html`. Expected: banner appears at the bottom. In the Network tab, confirm **no** request to `googletagmanager.com` has fired.
3. Click "Accepteren". Expected: banner disappears; a new request to `googletagmanager.com/gtag/js?id=G-XXXXXXXXXX` appears in the Network tab (it will 404/fail since the ID is a placeholder — that's expected, the point is the request fires).
4. Reload the page. Expected: banner does not reappear, and the GA request fires again automatically (consent remembered).
5. Clear `cookie-consent` from Local Storage again, reload, and this time click "Weigeren". Expected: banner disappears, no GA request fires in the Network tab.
6. Reload again. Expected: banner stays hidden (declined choice remembered), still no GA request.
7. Repeat step 2 on `over-ons.html`, `diensten.html`, `contact.html`, and `privacy.html` to confirm the banner and script are wired on every page.

- [ ] **Step 4: Commit**

```bash
git add index.html over-ons.html diensten.html contact.html privacy.html js/main.js
git commit -m "Add cookie consent banner with consent-gated Google Analytics"
```

---

### Task 7: Mobile navigation toggle + final cross-page verification

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Produces: `js/main.js` function `initNavToggle()`, added to the same `DOMContentLoaded` listener as the other two init functions.

- [ ] **Step 1: Add nav toggle logic to `js/main.js`**

Append this function, and add `initNavToggle();` to the `DOMContentLoaded` listener:

```javascript
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}
```

Final `DOMContentLoaded` listener in `js/main.js` should read:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  initCookieConsent();
  initNavToggle();
});
```

- [ ] **Step 2: Verify mobile nav on every page**

With the local server running, for each of `index.html`, `over-ons.html`, `diensten.html`, `contact.html`, `privacy.html`:

1. Open the page, resize the browser (or devtools device toolbar) to 375px wide.
2. Click the &#9776; button. Expected: nav list drops down below the header, showing all 4 links stacked vertically.
3. Click a nav link. Expected: navigates to that page correctly.
4. Click &#9776; again on the new page. Expected: menu opens/closes correctly there too (confirms `main.js` wiring is consistent across pages).

- [ ] **Step 3: Full-site link and layout pass**

With the local server running, open each of the 5 pages at both 375px and 1280px widths and confirm:
- No horizontal scrollbar appears at either width
- Every nav link, footer link, and CTA button (`Offerte aanvragen`, `Bekijk diensten`, `Alle diensten bekijken`, `Bekijk Google reviews`, `Privacy & disclaimer`) navigates to the correct page or external URL
- No broken image icon appears anywhere (logo should render on all 5 pages)
- Devtools console shows zero errors on every page

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "Add mobile nav toggle and complete cross-page verification"
```
