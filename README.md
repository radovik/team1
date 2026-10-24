# Silný tým — working draft

Czech multi-page website using semantic HTML, one shared stylesheet, JSON and vanilla browser JavaScript. No package manager, local dependencies, bundler or build step. The approved warm neutral palette, original logo and existing Google Fonts link are retained.

This is an editable draft, not a production-ready launch. Publishing it at the production URL does not resolve outstanding editorial or operational decisions. Visible editorial notes are intentional. All 12 public HTML files contain `noindex`; this is a crawler instruction, **not access control**. There is no tracked sitemap or robots file. Do not block crawlers from reading the HTML noindex instruction.

## Local preview and checks

```sh
python -m http.server 8000
node --check script.js
node --check content-todos.js
git diff --check
```

Open `http://localhost:8000`. Use an HTTP server, not a double-click on HTML. Python serves the pages and fetched JSON, but not Vercel OAuth functions. There are no install, build, test-runner or lint commands.

`/admin/` runs Sveltia CMS from a CDN, using the existing Decap-compatible configuration and GitHub OAuth functions. `/admin/decap.html` retains Decap as a fallback with the same configuration and content; do not edit the same entry in both interfaces at once. Both load their configuration locally, but GitHub OAuth login works only on the Vercel production origin. Do not save through the connected CMS merely to test this draft: its GitHub backend writes directly to `main` and may trigger production deployment. A local JSON test, YAML validation and an actual authenticated CMS save are different verification levels.

Sveltia is pinned to the reviewed pre-1.0 release `0.250.2` for a controlled migration. Review [release notes](https://github.com/sveltia/sveltia-cms/releases) regularly, including security fixes, before updating the CDN version. No npm package, Svelte application, build step, new OAuth app or new credentials are needed. See [CMS migration verification](docs/CMS_MIGRATION.md) for the checks and limitations of this change.

See [draft verification](docs/DRAFT_VERIFICATION.md) for the checks actually performed, local fixture coverage and explicit limits. An authenticated CMS save has not been tested in this implementation.

## Content architecture

- Public HTML keeps shared header/footer and meaningful Czech fallback content.
- Each `main[data-content-file]` fetches its own JSON. A missing, invalid or unavailable file leaves usable HTML and navigation.
- `sections[].items` retains the existing selector-based model, now using stable `data-copy` hooks. Selectors and modes remain hidden in the CMS; editors change text, not code.
- The homepage restores the approved Stitch composition with the revised copy. Inline emphasis uses the existing limited formatter; shared editorial notes remain visible in a quieter neutral treatment.
- Optional profile paragraphs appear only when filled. HTTPS professional links are optional and must be verified. This does not verify credentials automatically.
- `images[]` has editable upload paths and alternative text. Images use fixed frame dimensions; failed media restores the monogram with an accessible description. Use `/img/uploads/...`.
- `content/editorial-notes.json` is the sole editable source of note titles, instructions and statuses. Stable IDs map to contextual HTML mounts. The same note can appear on several routes without duplicate editable copies.
- `content-todos.js` is only a technical ID/route index; it is no longer loaded by public pages and cannot overwrite CMS instructions. HTML contains a fallback copy for network failures.
- Missing or invalid shared notes JSON leaves the HTML note fallback. `needs_input` and `ready_for_review` stay visible; only explicit `resolved` hides the note, not content or media.
- Update HTML fallback and JSON together when changing structure or reviewed baseline copy. Later CMS saves change JSON only; there is no automatic HTML regeneration.
- `admin/config.yml` keeps the existing GitHub backend and 12 fixed route entries, plus the shared notes entry in a separate collection. Editorial workflow remains off.
- `api/` is unchanged. Both CMS entry points explicitly load `/admin/config.yml`. Production OAuth origin and callback remain `https://team1-beige.vercel.app` and `https://team1-beige.vercel.app/api/callback`. The GitHub backend, `base_url`, `auth_endpoint`, repository and branch are unchanged. Environment values stay in Vercel, never in source.

| Public route | Content file | CMS entry |
| --- | --- | --- |
| / | content/pages/home.json | pages / home |
| /pro-koho/ | content/pages/pro-koho.json | pages / pro-koho |
| /jak-pracujeme/ | content/pages/jak-pracujeme.json | pages / jak-pracujeme |
| /programy/ | content/pages/programy.json | pages / programy |
| /vysledky/ | content/pages/vysledky.json | pages / vysledky |
| /pro-hr/ | content/pages/pro-hr.json | pages / pro-hr |
| /o-nas/ | content/pages/o-nas.json | pages / o-nas |
| /faq/ | content/pages/faq.json | pages / faq |
| /team-health-scorecard/ | content/pages/team-health-scorecard.json | pages / team-health-scorecard |
| /kontakt/ | content/pages/kontakt.json | pages / kontakt |
| /soukromi/ | content/pages/soukromi.json | pages / soukromi |
| /cookies/ | content/pages/cookies.json | pages / cookies |

Shared notes: `editorial / editorial-notes` → `content/editorial-notes.json`.

## Browser-only behavior

The introductory conversation is separate from three collaboration formats. Draft durations and prices require owner confirmation. `/programy/#program-90` is preserved.

Homepage selection only lists chosen conversation topics. Reflection retains the original 12 question IDs and three areas; it displays individual answers, nonnumeric choices, completion progress and reset, never aggregate scores or a diagnosis. Results require no email. Answers and form values are not sent, logged, stored in URLs, cookies or persistent browser storage. Page content and shared notes still require normal read-only GET requests.

The contact form is disabled without JavaScript and enables only after its non-submitting handler is registered. Name/email validation is local; topic, role, size and coach preference are optional. Success means field validation only, never delivery or booking. No endpoint, calendar, analytics or other integration was added. Existing Google Fonts requests and Vercel/admin service behavior still need an operational privacy review.

The HR overview is ordinary printable HTML; use the browser print command. Print styles retain contextual notes and suppress navigation, fixed CTAs and decorative motion.

## Návod pro Martinu a Veroniku

1. Správa obsahu je na `https://team1-beige.vercel.app/admin/`. Po nasazení migrace zde bude Sveltia CMS: přihlaste se přes **GitHub** stejně jako dosud, bez nových klíčů. Původní Decap zůstává na `https://team1-beige.vercel.app/admin/decap.html`. Neupravujte stejnou stránku současně v obou administracích. Sveltia přebírá jazyk prohlížeče; češtinu lze zvolit také v nabídce účtu v nastavení jazyka. **Uložení v připojeném CMS zapisuje přímo do větve main a může spustit nasazení.** I při zveřejnění na produkční adrese jde stále o pracovní návrh s viditelnými poznámkami. Neprovádějte zkušební ukládání; ukládejte jen zamýšlené úpravy obsahu.
2. V kolekci **Stránky** vyberte konkrétní stránku, rozbalte její sekci a změňte text. Technické umístění řeší web; nemusíte upravovat HTML ani JavaScript.
   U zvýrazněných nadpisů značí `*text*` kurzivu a `**text**` tučné písmo. Hvězdičky lze upravit nebo odstranit; nevkládejte HTML. Malé popisky sekcí i text úvodní karty mají vlastní pole.
3. Na stránce **O nás** doplňte odděleně představení, ověřenou profesní praxi, doložené vzdělání a přínos každé koučky. Prázdná profilová pole ani nevyplněný profesní odkaz se nezobrazují. Stejné krátké představení na úvodu má vlastní pole, proto zkontrolujte obě stránky.
4. V části **Obrázky** nahrajte autentickou schválenou fotografii a doplňte alternativní text. Média se ukládají do `img/uploads/`. Společná fotografie a portréty na úvodu a stránce O nás mají vlastní pole; můžete použít stejný nahraný soubor.
5. Otevřete kolekci **Poznámky k dokončení → Společné poznámky**. U každého úkolu upravte název, co dodat nebo ověřit, a stav. Jedna společná poznámka se může objevit u více souvisejících stránek.
6. **K doplnění** znamená chybějící vstup. **Ke kontrole** znamená návrh čekající na potvrzení; poznámka zůstane viditelná. Až po výslovném ověření zvolte **Vyřešeno**: skryje se pouze poznámka, text a fotografie zůstávají. Vyplnění pole samo o sobě nic neověřuje.
7. Poznámky jsou veřejnou součástí návrhu. Nevkládejte citlivé údaje klientů, soukromé doklady, hesla ani přístupové klíče. Schválený text a instrukci k doplnění držte v oddělených polích.
8. Po povoleném uložení zkontrolujte veřejnou stránku i mobilní zobrazení. Místní úprava JSON ověřuje zobrazení, nikoli přihlášení a skutečné uložení přes GitHub. V nové administraci nebylo skutečné přihlášení a publikování zatím ověřeno; místní test není totéž. Formulář zatím nic neodesílá a dotazník není diagnostický test.

## Inputs and later launch review

Current source contains no independent evidence for biographies, years of experience, credentials or client outcomes. Do not publish legacy claims as verified facts. Notes preserve earlier qualification details for owner review, without claiming credentials in finished copy.

Owners must confirm biographies/education/professional links, authentic photographs, prices, durations, session/time requirements, format dependencies, staffing, audience focus, testimonials with consent, sharing/contractual rules, supplier/controller, services, retention/access and contact procedure. Language scope, a future common calendar and custom domain remain decisions.

Before a separately authorized launch:

- Confirm content, qualifications, photographs and all commercial parameters.
- Complete actual contact and appropriate privacy/contractual information.
- Connect real delivery or booking only after separate approval; verify it end to end.
- Reassess actual third-party services, cookies, logs and data transfers.
- Complete or deliberately remove unfinished sections; do not bulk-hide notes to simulate completion.
- Review production domain, canonical/social metadata, sitemap and removal of noindex only for ready pages.
- Check understanding with HR and leadership representatives; this research has not been performed.
- Obtain explicit permission before pushing main or deploying.

No secrets or .env files belong in this repository. The nested untracked `team1/` copy and owner-supplied briefs are outside application edits.
