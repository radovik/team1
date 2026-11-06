# Content review draft — 6 November 2026

## Scope and decisions

- Implemented the owner-supplied November brief in the tracked static site on `codex/content-refresh-preview`, for Preview review only.
- The latest brief explicitly replaces earlier public-note visibility, leadership-only positioning and fixed programmes. There are five primary pages, two existing legal utility pages outside primary navigation and six legacy redirects. No new service or audience beyond the brief was added.
- Preserved the visual system. CSS changes only adjust spacing for the longer copy/cards and add a neutral shared-photo frame. Palette, typography, logo, buttons, breakpoints and existing motion/accessibility rules are unchanged.
- Approved homepage wording is taken directly from the brief. Qualifications and Veronika's general HR background are owner-supplied, not independently verified. No ACTC claim, number of years, fixed price/duration, client story or performance statistic was introduced.
- Belbin describes team behaviour/roles rather than fixed personality types. HEXACO-PI-R describes individual personality characteristics, not guaranteed honesty/toxicity detection. Methods are optional, may be useful independently and carry no promise of saved coaching sessions.
- All 29 legacy task IDs/statuses remain in CMS; obsolete programme tasks are archival. Three additional review/operational tasks are separate from finished copy. No task was silently resolved. Visitor HTML has no note mounts and does not fetch shared notes. JSON is not private storage.
- Sveltia, Decap fallback, GitHub backend and OAuth functions are preserved. CMS entries match seven real content pages. Preview is not a safe live CMS save environment: the backend still targets main.
- Contact has four fields and local validation only. No verified contact address, delivery service or booking integration was supplied. The UI explicitly says nothing is sent.
- All HTML and redirect fallbacks retain noindex. Vercel deployment-level redirects use temporary 307 status pending approval; local static fallbacks use meta refresh plus a visible link. `/programy/#program-90` keeps a target anchor on the process section.

## Route and content map

README lists every primary/utility route, matching JSON/CMS entry and legacy destination. Previous copy remains recoverable in Git history; obsolete active JSON files were removed rather than presented as current offers.

## Verification

Applicable local and Preview checks are recorded below when completed. Configuration parsing, local JSON fixtures and real GitHub login/save are different levels; none proves the others.

### Local checks performed

- Offline standard-library parser: seven content routes, exactly five ordered navigation links, identical headers/footers, unique H1/IDs and Czech noindex metadata. All 193 CMS text hooks match fallback HTML; 152 internal asset/link/anchor references resolve.
- All 43 approved homepage copy blocks are present without paraphrasing. Homepage main content links only to contact. The five-page structure and optional methods match the brief; retired offers are not active entries.
- Parsed all eight content JSON files and Vercel JSON. Confirmed all 29 original note IDs/statuses remain within 32 current notes, seven CMS file entries, unchanged GitHub backend block and unchanged CSS tokens.
- Browser: seven routes at 1440, 390 and 320 px; five primary routes additionally at 1024 and 768 px. JSON loaded, no horizontal overflow, no note mounts, and no broken normal images. Captured desktop/mobile screenshots outside the repository. Normal-run console error check returned no errors.
- Mobile menu opens with the five links; Escape closes it and returns focus. Contact tests covered missing required fields, invalid email and synthetic valid values. The result stated local validation only, focus moved to the status, and the URL remained unchanged. Four fields only: name, email, optional organization and message.
- Read-only server fixtures changed homepage JSON text and supplied an existing brand PNG as a clearly test-only image. Text changed and image/alt loaded; a missing upload restored the neutral monogram. No actual coach photograph was invented or written to source.
- Missing (404) and malformed home JSON preserved approved HTML and five navigation links. Navigation from the fallback worked. All six local meta-refresh legacy routes reached their documented destinations.
- A temporary CSS fixture doubled font sizes on the five primary pages at 1440, 390 and 320 px. Correctly enlarged H1 sizes were confirmed (108 px desktop, 70.2/64 px mobile). The homepage's original `joint-visual` class was retained so its brand-card text wraps; no clipped main elements remained. This was a CSS enlargement simulation, not native browser zoom. Initial wrong-MIME fixture results were discarded; the fixture was corrected before the reported check. Normal CSS was restored.
- The actual Sveltia runtime parsed the YAML/anchors and showed seven Czech-labelled page entries plus the shared 32-note file. In its isolated `test-repo` browser filesystem, saved/reopened a title and a note instruction with `Ke kontrole`; values persisted. The real GitHub backend was never used for this test.
- `node --check script.js`, `node --check content-todos.js` and `git diff --check` passed. OAuth functions and both CMS HTML entry points are unchanged. Source review found no new submission API, analytics or persistent response storage; test server logs showed GET content/assets, not enquiry POSTs. Normal visitor pages skip fetching editorial notes.
- All fixture overrides were outside the repository and restored to empty state. Source JSON retains approved copy and original note statuses, not test values. Historical documents and the nested `team1/` were not edited/staged.

### Verification limits

- No real GitHub OAuth login, upload/content commit, save-to-main or resulting production deployment was tested. An isolated virtual save is not an end-to-end CMS test.
- Actual devices, screen-reader output, native browser zoom, a full privacy/legal review, credential evidence and real message delivery were not verified. Delivery is intentionally not connected.
- Preview build/routing and production preservation are checked separately during release; local meta refresh does not prove Vercel HTTP status codes.

### Preview checks

- First Preview reached READY from the review branch. Twenty deployed HTML/JSON/CSS/JS/CMS resources returned 200 and matched the reviewed source (excluding Vercel's injected feedback toolbar). Production HTML still matched unchanged `origin/main` at `81eb61d`.
- The initial server check exposed a trailing-slash edge case: wildcard redirects handled bare/nested paths, while `/programy/` and the other five slash-ending legacy routes served the HTML redirect fallback. Added explicit slash-ending rules alongside the wildcard rules; the resulting Preview needs the same HTTP-header check. There are six logical legacy redirects expressed as twelve matching rules.
- The build used no framework or repository build step. Vercel compiled the existing OAuth functions from ESM to CommonJS; the platform's package.json suggestion does not authorize adding a package manager or changing authentication.

## Remaining inputs and approval boundary

- Approve the five-page proposal and owner-supplied qualification wording before production publication.
- Supply authentic photographs with rights/alt text, Martina's verified background, approved introductions, exact training details and professional links.
- Supply verified contacts, supplier/controller information and an approved delivery/privacy process before enabling enquiries. Diagnostic terms and result-sharing rules need operational confirmation.
- Do not reactivate fixed programme/price assumptions or publish references without approved evidence.
- No main push, production deployment, secret change or real personal-data collection is authorized by this Preview request.

## Method terminology sources

- [Belbin: behaviour and team roles](https://www.belbin.com/resources/faqs)
- [Belbin Team Roles](https://www.belbin.com/about/belbin-team-roles)
- [HEXACO-PI-R](https://hexaco.org/hexaco-inventory)

These support terminology only, not the coaches' credentials or promised client outcomes.
