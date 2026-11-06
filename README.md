# Silný tým — content review draft

Czech semantic HTML, shared CSS, vanilla JavaScript and JSON. No framework, package manager, local dependencies or build step. The 6 November 2026 owner brief replaces the earlier content proposal, not its approved warm palette, typography, logo or component system.

This branch is an owner-review proposal, not a production release. All public HTML and redirect fallbacks retain `noindex`. Do not push main, promote a deployment or connect data collection without separate authorization.

## Local preview and checks

```sh
python -m http.server 8000
node --check script.js
node --check content-todos.js
git diff --check
```

Use `http://localhost:8000`, not a file URL. Python serves HTML/JSON but not Vercel redirects or OAuth. There is no install, build, test-runner or lint command.

## Current route map

Five primary navigation links appear in this exact order. Each entry below is in the CMS `pages` files collection.

| Label | Route | Content JSON / CMS entry |
| --- | --- | --- |
| DOMŮ | / | content/pages/home.json / home |
| S čím pomáháme | /s-cim-pomahame/ | content/pages/s-cim-pomahame.json / s-cim-pomahame |
| Jak pracujeme | /jak-pracujeme/ | content/pages/jak-pracujeme.json / jak-pracujeme |
| O nás | /o-nas/ | content/pages/o-nas.json / o-nas |
| Domluvit schůzku | /kontakt/ | content/pages/kontakt.json / kontakt |

The existing `/soukromi/` and `/cookies/` utility pages remain outside primary navigation, with matching JSON/CMS entries. They describe this actual non-submitting draft, not complete legal information for a future enquiry service.

| Retired route | Destination |
| --- | --- |
| /pro-koho/ | /s-cim-pomahame/ |
| /programy/ | /jak-pracujeme/ |
| /vysledky/ | /s-cim-pomahame/ |
| /pro-hr/ | /s-cim-pomahame/ |
| /faq/ | /jak-pracujeme/ |
| /team-health-scorecard/ | /s-cim-pomahame/ |

Vercel adds HTTP 307 redirects through `vercel.json`; temporary redirects avoid permanent caching before approval. The six old HTML paths retain a meta-refresh and visible destination link for local/static hosting. Previous copy is recoverable from Git history; six obsolete page JSON files are removed from active CMS. No Reference or Blog page was added.

## Content and CMS

- Shared headers/footers remain in HTML. Each `main[data-content-file]` fetches matching JSON. Missing/invalid JSON preserves meaningful HTML and navigation.
- Approved home wording is retained. Other pages follow supplied topics. Qualifications and Veronika's general HR experience come from the owner brief, not independent credential verification. No client outcomes, statistics, fixed prices, programme lengths or invented biography were added.
- Editors use Czech fields. Hidden selectors/modes use the existing safe text/limited-inline renderer. Fallback HTML and JSON were updated together; later CMS saves update JSON only, without automatic HTML regeneration.
- Photographs are optional. Until authentic images are supplied, the existing brand treatment and neutral monograms remain, not invented portraits.
- `content/editorial-notes.json` is the sole editable task source. All 29 previous IDs/statuses remain; retired-offer tasks are marked as historical context. Three review/operational notes were added.
- Visitor HTML has no note mounts; the script skips loading notes when none exist. Notes are not globally CSS-hidden or automatically resolved.
- Static JSON and CMS config remain technically public assets, not private storage. Never put secrets, private evidence or sensitive client information in them.
- `content-todos.js` is an unused legacy technical index, not an editable authority.

## Administration and Preview safety

Sveltia is at `/admin/`; Decap remains at `/admin/decap.html`. Both load `/admin/config.yml`. The pinned runtime, GitHub backend, repository, production origin/callback and `api/` are unchanged. See [CMS migration](docs/CMS_MIGRATION.md) for earlier isolated checks.

**The backend still writes to main. Preview is for visual review, not test publication.** Do not sign in/save through Preview to test this proposal. The callback accepts only the production origin. Do not relax the check, create credentials or change backend branch as an incidental workaround.

The requested Preview uses `codex/content-refresh-preview`, not main. See [content review record](docs/CONTENT_REFRESH.md) for actual verification and remaining inputs.

## Návod pro Martinu a Veroniku

1. Návrh nejprve prohlédněte na preview adrese. **V preview nic zkušebně neukládejte do CMS:** připojený backend stále zapisuje do main a může změnit produkci. Zveřejnění návrhu vyžaduje samostatné schválení.
2. Po schváleném zapojení návrhu je správa na `https://team1-beige.vercel.app/admin/`. Přihlašování přes GitHub zůstává stejné; Decap je záloha na `/admin/decap.html`. Neupravujte jednu stránku současně v obou rozhraních. Češtinu lze zvolit v nastavení účtu.
3. V kolekci **Stránky** vyberte stránku, rozbalte její sekci a změňte text. Technické selektory jsou skryté. `*text*` znamená kurzivu a `**text**` tučné písmo; nevkládejte HTML.
4. V části **Obrázky** nahrajte schválenou autentickou fotografii a doplňte alternativní text. Média se ukládají do `img/uploads/`. Společná fotografie na úvodu a portréty na O nás mají vlastní pole. Prázdné pole ponechá značku nebo monogram.
5. Osobní představení a profesní zkušenosti na **O nás** doplňujte pouze z ověřených údajů. Prázdné volitelné odstavce a nevyplněné profesní odkazy se nezobrazují.
6. **Poznámky k dokončení → Společné poznámky** obsahují úkoly, které se už nevykreslují návštěvníkům. Staré úkoly k pevným programům jsou označené jako archiv, nikoli jako část nové nabídky.
7. **K doplnění** označuje chybějící vstup, **Ke kontrole** návrh čekající na potvrzení. **Vyřešeno** zvolte až po skutečném ověření. Změna stavu neodstraňuje hotový obsah ani neaktivuje službu.
8. Nevkládejte citlivé údaje, soukromé doklady ani hesla. Soubor s úkoly je stále technicky veřejně dostupný.
9. Formulář má pouze jméno, e-mail, volitelnou organizaci a zprávu. Tlačítko kontroluje pole; **nic neodesílá ani nerezervuje**.

## Remaining inputs

Authentic photographs, Martina's verified background, fuller approved introductions, exact training details/professional links, verified contacts, supplier/controller information, diagnostic operating/sharing conditions and an approved delivery process remain open. Supplied qualification copy does not authorize an operational integration.

No email address, calendar, form service, analytics, AI or diagnostic data collection was connected. Removing noindex and publishing production require separate approval. The nested untracked `team1/` and historical owner documents are outside application edits.
