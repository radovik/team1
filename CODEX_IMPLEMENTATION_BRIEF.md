# Silný tým — final Codex implementation brief

Brief version: 4 October 2026. English instruction edition. The goal is a working website with clear content and reliable functionality that Martina Jonášová and Veronika Vojtová can complete in Decap CMS. Production deployment is outside this task.

## Language policy

- Implementation instructions and developer-facing technical documentation: English.
- Website copy, CMS labels and help text, editorial notes, validation messages, accessibility text, and page metadata: Czech.
- Preserve the explicitly supplied Czech strings, including diacritics. Czech examples and quoted copy below are intended for the website or CMS, not for translation into English.
- Keep the coach-facing CMS editing guide in Czech, even if it is a section of an otherwise English `README.md`.
- Preserve code identifiers, paths, URLs, and machine-readable status values unless a functional requirement explicitly changes them.
- Communicate with the user and deliver the final implementation report in Czech.

## 1. Task and binding decisions

Read the new `AGENTS.md`, inspect the actual tracked repository, and implement the changes. Another audit, proposal, or rewrite of this brief is not sufficient. Preserve the static architecture, CMS, and URLs. Work autonomously on ordinary reversible changes; mark missing business facts for completion and continue with the rest of the work.

If the target repository is unavailable, describe the missing access accurately. Do not create a replacement application or claim the existing website was changed.

### User-approved decisions

1. Preserve the warm neutral palette the owner likes. Change colors only for a concrete benefit, particularly accessibility.
2. Prioritize wording, meaning, a clear service offer, trust, and useful functionality.
3. Use a collaborative, concrete tone without aggressive marketing or disparaging other approaches.
4. The introductory offer is `Úvodní rozhovor`; the primary navigation CTA is `Domluvit úvodní rozhovor`.
5. Present an introductory conversation and three collaboration formats, not four equivalent programs.
6. Distinguish the commissioning stakeholder's perspective, shared exploration with the team, and an individual reflection questionnaire.
7. Remove percentage-based team-health ratings and diagnostic conclusions based on how many situations a visitor selects.
8. **Keep visible completion notes and make them editable or replaceable through CMS.** This includes photographs, prices, credentials, contractual arrangements, and technical connections.
9. An unconnected form must not pretend to send a message. Do not add new data-collection services in this phase.
10. Do not deploy to production or push to `main`.

This brief and the new `AGENTS.md` supersede the previous implementation brief. Keeping editorial notes is the user's explicit correction to the original audit; do not override it with the older instruction to remove all TODOs.

### Existing audit observations to verify against current code

Reference draft website: https://team1-beige.vercel.app/

At the content audit on 4 October 2026, the homepage CTA was already taupe and the right-hand hero card did not contain percentage results. Do not assume every issue described in the old brief still exists. The questionnaire, however, displayed 60% in all three areas when every answer was 3. Current code and rendered content take precedence over historical descriptions.

The baseline project has 12 expected routes:

`/`, `/pro-koho/`, `/jak-pracujeme/`, `/programy/`, `/vysledky/`, `/pro-hr/`, `/o-nas/`, `/faq/`, `/team-health-scorecard/`, `/kontakt/`, `/soukromi/`, `/cookies/`.

## 2. Before editing

- Read `AGENTS.md`, `README.md`, `styles.css`, `script.js`, `content-todos.js`, `admin/config.yml`, public HTML files, and `content/pages/*.json`.
- Check Git status and preserve the user's changes. Do not work in the nested, untracked `team1/` copy.
- Map repeated headers and footers, JSON replacement of HTML content, the source of editorial notes, and all CTAs.
- Identify which photographs, contacts, credentials, and business facts have supporting evidence. A claim appearing in an old draft is not evidence that it was verified.
- Check whether CMS supports editing note text, note status, and photographs. Make the smallest necessary extension.
- Record the initial appearance and behavior of the main pages. Do not rebuild the entire site for cosmetic changes.

## 3. Editorial draft mode and CMS

### Required behavior

Notes are temporary editorial aids. Keep them visible beside the section the coaches need to complete. They must be distinguishable from finished marketing copy and service claims.

- Use a calm, separate block with a Czech label such as `K doplnění v CMS` or `K ověření před zveřejněním`.
- Distinguish missing content, a decision awaiting confirmation, and a technical task in the note's title. Do not phrase technical notes as if the coaches must edit JavaScript themselves.
- Explain exactly what to supply and why. Example Czech instruction: `Martina: doplňte 2–4 ověřitelné věty o relevantní profesní praxi; neuvádějte nedoložené počty klientů.`
- Preserve existing unresolved tasks. Do not disable them through global CSS, move them to the footer, or keep them only in an internal registry.
- Never put passwords, sensitive client information, or private evidence into these notes. Anyone with access to the draft website can see them.

### Minimum model

Prefer the existing structure. These are required capabilities, not an instruction to replace the entire CMS model without inspection:

| Field | Purpose |
| --- | --- |
| Stable ID | Preserve note identity during moves and migration |
| Section association | Position the note beside the correct content; this technical association is not normally edited |
| Title | For example, `Fotografie kouček` |
| Instruction | Plain text editable in CMS |
| Status | `needs_input`, `ready_for_review`, `resolved` |

Show Czech status labels in CMS:

| Stored value | Czech label |
| --- | --- |
| `needs_input` | `K doplnění` |
| `ready_for_review` | `Ke kontrole` |
| `resolved` | `Vyřešeno` |

The first two statuses remain visible on the draft page. Resolving a note hides that note while preserving completed content. Do not infer verification automatically from a nonempty field.

Finished copy, photographs, and editorial instructions need separate editable fields. Images need editable alternative text. Preserve `img/uploads/` and existing path conventions. New portraits will be supplied through CMS; missing photographs must not block other work.

If `content-todos.js` currently generates fixed note text, move its authoritative editable content into CMS while preserving IDs and associations. Do not let old JavaScript overwrite CMS changes after loading. There must be only one authoritative source.

Add a short Czech guide to `README.md` for the coaches: how to find a page, change copy, upload a photograph, edit a note, mark it for review, and resolve it. Accurately explain that the baseline Decap configuration writes directly to `main`; saving through the connected CMS may trigger deployment. Do not change this workflow without authorization or test it by committing to `main`. Distinguish local content verification from a real save in the connected CMS.

## 4. Terminology and tone

### Terminology mapping

The strings below are Czech website copy unless they are explicitly listed as old English terms. Keep existing routes even when labels change.

| Current label | Replacement copy or rule |
| --- | --- |
| Team Health Audit / `audit` used for the initial conversation | `Úvodní rozhovor` |
| `Rezervovat audit` / `Rezervovat Team Health Audit` | `Domluvit úvodní rozhovor` for links to the contact page |
| `Diagnostický sprint` | `Mapování fungování týmu` |
| Leadership Team System | `Dlouhodobá spolupráce` |
| Team Health Scorecard | `Reflexe spolupráce v týmu`; see its H1 below |
| `Výsledky` | `Jak poznáme posun` |
| `Programy` in navigation | `Spolupráce` |
| sponsor | `zadavatel`; explain responsibility for the brief and budget at first use |
| ownership | `odpovědnost za dohodu` / `nositel úkolu`, depending on context |
| `growing firmy` | `rostoucí firmy` |
| debrief / review / kick-off / onsite | `společné vyhodnocení` / `průběžné vyhodnocení` / `úvodní setkání` / `osobně` |

Do not change established URLs or working anchors merely to match a new label. Do not redraw the logo; preserve any English text that is part of an approved brand asset.

### Tone

Prefer sentences describing observable behavior and client needs. Remove blanket judgments from active finished copy, including `Tohle nevyřeší další workshop`, `bez koučovací mlhy`, `neprodáváme hodiny`, `teambuilding vyprchá`, and `po facilitaci zbude zápis`. Explain professional boundaries without contempt.

Use wording such as `cílem je`, `pracujeme na`, and `společně vyhodnotíme` when describing intended progress. Do not turn intentions into guaranteed results. Do not add pressure, unsupported scarcity, pop-ups, countdowns, an email gate for results, or automated sales sequences.

Approval of this brief authorizes the proposed copy and layout changes. It does not verify biographies, contractual terms, prices, or specific commitments by the coaches. Add editorial notes for uncertain facts.

## 5. Navigation and shared elements

Use these Czech labels in the main navigation:

1. `Pro koho` — `/pro-koho/`
2. `Jak pracujeme` — `/jak-pracujeme/`
3. `Spolupráce` — `/programy/`
4. `O nás` — `/o-nas/`
5. `Pro HR` — `/pro-hr/`
6. CTA `Domluvit úvodní rozhovor` — `/kontakt/`

The logo links home; a separate `Úvod` item in the main navigation is unnecessary. Preserve this order and the CTA's full meaning on mobile.

The footer also includes `Jak poznáme posun`, FAQ, contact, privacy, and cookies, with all visible labels in Czech. Keep access to the reflection questionnaire for review and editing during this draft phase, but label it as a draft tool and do not make it a mandatory gateway to the offer. Later production promotion depends on completing its content and verifying its behavior.

## 6. Homepage

### Hero

Use this supplied Czech copy as the implementation baseline:

- Eyebrow: `Týmový koučink pro vedení firem`
- H1: `Aby společná rozhodnutí fungovala i po poradě.`
- Body: `Pomáháme týmům vedení ujasnit priority, otevřeně pracovat s rozdílnými názory a převádět dohody do každodenní spolupráce. Vycházíme ze situací, které váš tým skutečně řeší.`
- Primary CTA: `Domluvit úvodní rozhovor`
- Secondary link: `Jak spolupráce probíhá` — `/jak-pracujeme/`

A 30-minute duration may appear below the CTA if confirmed by the owners; otherwise mark the duration for confirmation in an adjacent note. Do not invent a price or claim that the conversation is free. `Bez závazku` does not communicate a price.

Prefer an authentic joint photograph of the coaches if one exists and is approved for use. Otherwise preserve a refined temporary text or monogram visual and a visible CMS note requesting the photograph. Do not substitute stock portraits or AI likenesses. A generic decorative card has lower priority than a real introduction to the people.

### Typical situations

Heading: `Co byste ve spolupráci svého týmu chtěli posunout?`

Include development opportunities as well as difficulties: decisions repeatedly reopened without new information, unspoken differences of opinion, excessive dependence on one person, company growth, a changed leadership team, or a new strategy. Hybrid work is not inherently a problem.

If clickable selection remains, give it a useful local purpose: summarize selected topics as a conversation aid. Do not automatically transmit the selection, store it in the URL, or generate a diagnosis. Remove the three-symptom rule and claims that the cause must lie in the functioning of the whole team. Helper copy: `Vyberte situace, které byste chtěli probrat. Výběr slouží k ujasnění témat.`

### Remaining content order

Keep a short path: situations → process → coaches → collaboration formats → confidentiality rules → a few practical FAQs → contact. Reduce repetition of the same offer across multiple sections. A concise comparison of methods can link to fuller explanations in the FAQ.

The process and format names must match the following pages. Keep CMS-managed notes beside profiles, photographs, prices, and the staffing model visible.

## 7. Audience page: /pro-koho/

Proposed H1: `Pro týmy vedení, které chtějí posunout svou spolupráci.`

- Include growth, strategy changes, new leadership, delegation of authority, difficult collaboration across departments, and recurring problems.
- Mention 6–12 people only as a typical range if it reflects the actual focus. Do not make 40–250 employees the primary or automatically exclusionary company criterion; leave an editorial decision note if this focus is unconfirmed.
- Explain shared purpose and interdependent work. A group of managers does not automatically constitute a single team.
- Distinguish the commissioning stakeholder, the HR person coordinating the process, and the team involved.
- Preserve a section about when another approach may fit better. Bullying, a need for investigation, or an instruction to `opravte jednoho člověka` requires a different assessment and potentially another service. Do not supply an automatic diagnosis or universal recommendation for mediation.
- Do not require a prospective client to know the precise brief or the right program before contacting the coaches.

## 8. Process page: /jak-pracujeme/

Use the same four steps here and in a shorter homepage version. The introductory conversation precedes these steps and is not a diagnosis of the entire team.

Use the following Czech step headings and preserve the meaning of their descriptions. These descriptions are copy proposals; methods and commitments still depend on the confirmed scope:

1. **Dohoda o cíli a pravidlech.** Se zadavatelem i týmem se vyjasní smysl práce, role, očekávání, důvěrnost a způsob hodnocení.
2. **Společné porozumění situaci.** Různé pohledy, silné stránky, opakující se situace a případné pozorování skutečné porady; konkrétní metody musí odpovídat dohodnutému rozsahu.
3. **Zkoušení změn v praxi.** Setkání navazují na malé experimenty při rozhodování, předávání práce a řešení rozdílných názorů.
4. **Vyhodnocení a další fungování.** Tým posoudí, co se změnilo, co se má udržet a co případně vyžaduje jiný krok.

Include the wider system: shared purpose, decision authority, conflicting departmental goals, organizational conditions, and the expectations of people outside the team. Do not reduce a systemic approach to what happens in the room.

Include a short **illustrative example**, clearly labeled in Czech, not a fabricated testimonial: a team reopens decisions after meetings → explores why together → tries explicit decision closure, responsibility, and conditions for reconsideration → reviews the experience after an agreed period. Reconsidering a decision when new information appears may be appropriate.

Explain psychological safety through the ability to ask a question, flag a risk, acknowledge an error, or ask for help. Do not require public disclosure of personal matters or promise immediate openness.

Explain the intended client benefit of one or two coaches. Keep staffing and the specific arrangement marked for confirmation unless approved. Do not promise both coaches' automatic attendance or interchangeability without agreement.

## 9. Collaboration page: /programy/

H1: `Úvodní rozhovor a tři formáty spolupráce.`

Display the introductory conversation separately from the comparison of three paid formats. Remove public numbering from Program 0–3 and the phrase `vlajkový program`.

The table contains Czech offer copy; durations are draft proposals requiring confirmation:

| Offer label | Main purpose: Czech copy | Existing proposed duration: Czech copy |
| --- | --- | --- |
| Úvodní rozhovor | Probrat situaci z pohledu zájemce a domluvit vhodný další krok | 30 minut |
| Mapování fungování týmu | Propojit více pohledů a společně vybrat priority | 2–3 týdny |
| Tříměsíční týmový program | Zkoušet a vyhodnocovat změny v každodenní spolupráci | Přibližně 3 měsíce |
| Dlouhodobá spolupráce | Pracovat se širší nebo náročnější změnou | Dosud navrhováno 6 měsíců |

These durations come from the draft offer, not newly verified commitments. Keep them marked as proposals for review if approval is missing. Do not promise a particular result based on duration alone. Use Czech headings if presenting this table on the website.

Use the same structure for each format: when it fits, the focus of the work, specific contents, expected time commitment for team members, deliverables, evaluation, and next step. Add specific CMS notes for missing parameters rather than inventing them.

Clarify whether mapping is included in the three-month program and how formats connect. Session count, the commissioning stakeholder's time, and work between sessions are different things.

**Keep pricing notes in the draft.** Distinguish the missing price of the introductory conversation from a tailored program quote. Do not invent price ranges or label the conversation free without confirmation. Preserve the `#program-90` anchor if existing links use it, or safely maintain backward compatibility.

## 10. Progress page: /vysledky/

Visible label: `Jak poznáme posun`. Proposed H1: `Posun sledujeme v každodenní práci týmu.`

- Select goals and 2–3 indicators together with the commissioning stakeholder and the team.
- Distinguish team behavior, participants' perspectives, and possible organizational effects.
- Describe a baseline, interim review, final review, and possible follow-up. Leave inclusion and timing of follow-up for commercial confirmation.
- Do not promise direct causation between coaching and revenue, turnover, or other business outcomes.

Examples of indicators: time to close comparable decisions, clear responsibility and follow-through on agreements, members' experience of asking questions and expressing disagreement, and clarity of handovers between departments. Evaluate speed alongside quality; reopening a decision because of new information is not necessarily a failure.

Do not draw decorative outcome charts. Without genuine case studies, the page should explain how progress is assessed. **Keep the editorial note requesting verified testimonials**, but do not style it as an empty testimonial or unsupported proof. Future case studies need context, goals, scope, who led the work, evaluation method, results, limitations, and client consent.

## 11. HR page: /pro-hr/

H1: `Podklady pro rozhodnutí o spolupráci.`

Prepare an overview readable online and reasonably printable without registration: goals, suitability, scope, time commitment, leadership roles, team participation, deliverables, sharing rules, and pricing approach. Good HTML and print CSS are sufficient for this phase; do not build a new PDF export system. A separate finished download is a later step after content confirmation.

Explain concretely what is agreed with the commissioning stakeholder and what will be shared. Apply these rules to individual interviews and any one-to-one work between a coach and the commissioning stakeholder. Informing the team is not the same as involving it in the agreement.

Keep notes about the supplier, data controller, storage of notes, retention, both coaches' access, and contractual rules visible and editable. Do not fill them with generic legal text that implies the arrangements are complete. Do not add an absolute confidentiality guarantee without clarifying rules and exceptions.

## 12. About page: /o-nas/

Proposed H1: `Martina a Veronika. Dvě perspektivy pro práci s vaším týmem.`

- Give both profiles a balanced structure: a short introduction, relevant experience, documented education, and a specific contribution to team work.
- Give Martina a concrete note requesting her professional experience; do not invent her missing history.
- Verify Veronika's years of HR experience and education against available evidence. Do not automatically increase years of experience based on the calendar year.
- List ACC as an individual credential only after verification. Describe AATC as accreditation of the completed training program. Do not list ACTC without evidence of that separate certification.
- Allow a verified professional link to be added. Do not invent a profile URL or certificate number.
- Prefer authentic photographs. Until supplied, retain monograms and a clear note rather than a fake portrait.
- Explain the benefit of two coaches from the client's perspective. Remove wording such as `nekupujete Martinu versus Veroniku` and avoid presenting brand capacity as the primary value.
- Keep the one-coach/two-coach staffing model marked for confirmation until it has actually been decided.

## 13. FAQ

H1: `Co můžete od spolupráce očekávat.`

Retain useful questions about differences between methods, one or two coaches, coach preference, therapy, a one-day session, one-to-one work, the leader's participation, hybrid work, and pricing. Begin answers with a direct sentence, keep them concise, and align them with the rest of the site.

Add these Czech questions:

- `Co se dozví zadavatel a ostatní členové týmu?`
- `Co když část týmu spolupráci nechce?`
- `Kolik času potřebují členové týmu mezi setkáními?`
- `Co uděláme, pokud se očekávaný posun nedostaví?`
- `Je úvodní rozhovor placený a co při něm probereme?`

Do not invent uncertain answers. Provide a place for them and a visible editorial instruction. When some team members are reluctant, do not prescribe automatic coercion or promise immediate agreement. Do not present in-person meetings as a universal condition for hybrid work unless that is part of the actual offer.

## 14. Reflection questionnaire: /team-health-scorecard/

### Positioning

H1: `Jak vnímáte spolupráci ve svém týmu?`

Introductory copy: `Otázky vám pomohou ujasnit si zkušenost z posledních čtyř týdnů. Odpovědi zachycují váš pohled a mohou posloužit jako podklad pro rozhovor. Nejde o ověřený diagnostický test ani o objektivní hodnocení celého týmu.`

Keep a visible draft note requesting review of the questions. Do not call wording approval psychometric validation. Do not add someone else's validated scale without verifying its suitability, license, and language.

### Questions and answers

- Start from the existing 12 questions and three areas, improve clarity, and remove any need to guess other people's unobservable feelings.
- Prefer specific observable events and one issue per question. For example, consider replacing `Leader unese oponující názor` with `Vedoucí se při odlišném názoru ptá na jeho důvody.` This wording remains a proposal for the coaches' content review.
- Preserve stable question IDs and area mappings. Update CMS text, HTML, and corresponding accessible names together.
- Use these Czech scale labels: 1 `Téměř nikdy`, 2 `Zřídka`, 3 `Někdy`, 4 `Často`, 5 `Téměř vždy`.
- Offer `Nemohu posoudit` and `Netýká se nás` for every question. Never convert either to zero or the lowest rating.
- Show completion progress and allow going back and editing. A meaningful nonnumeric answer counts as answered; a missing answer remains a different state.

### Result

Implement a simple, truthful summary: the respondent's own answers grouped by area and an option to select one situation to explore further. The result must not say `váš tým má 60 %`, recommend a specific paid program based on a threshold, or attribute causes to problems.

Do not show aggregate scores, averages, percentages, benchmarks, or healthy/at-risk bands. Do not replace the old scoring with a new hidden scoring algorithm. Reflection prompts may include: `Co se vám daří opakovat?`, `Kterou situaci byste chtěli probrat s týmem?`, and `Jaký malý krok můžete vyzkoušet?`

If every response is `Nemohu posoudit` or `Netýká se nás`, show a neutral explanation that the answers do not provide concrete observations for reflection. Do not call it a poor result. If an answer is missing, identify that question accessibly.

Make the result available without email. Do not transmit answers, include their content in analytics events, or store them in URLs, `localStorage`, or other persistent storage. Use a statement such as `odpovědi zůstávají v tomto prohlížeči a neodesílají se` only after verifying the actual behavior. Add a clear `Vymazat odpovědi` action and an accessible result announcement; do not repeatedly announce the entire form on every change.

## 15. Contact page and truthful draft form

H1: `Domluvme si úvodní rozhovor.`

Body: `Pro začátek stačí stručně popsat, co byste chtěli ve spolupráci týmu posunout. Nemusíte předem vybírat program ani konkrétní koučku.`

Simplify the form:

- Name and email are the main contact fields.
- Allow a short conversation topic without a 20-character minimum or a demand for personal details. Do not force a detailed description of the situation.
- Role, team size, and coach preference are optional if retained.
- Replace `Je mi to jedno` with `Nechám si doporučit`.
- Do not add a required phone number, company budget, or familiarity with the term sponsor.

**Do not connect a new endpoint or calendar in this draft phase.** Preserve notes about integration and the price or duration of the first conversation. Unless delivery is already approved, functional, and within the current authorization, the form must explicitly operate as a preview:

- Visible message before the fields: `Pracovní náhled formuláře. Údaje se neodesílají; pro vyzkoušení použijte smyšlené údaje.`
- Button: `Vyzkoušet formulář`.
- After local validation: `Kontrola polí proběhla. Toto je pracovní náhled; nic se neodeslalo.`
- No network submission, content logging, persistent storage, or false booking confirmation. The state must be keyboard-accessible.

For a future real integration, the button must describe its action: `Požádat o úvodní rozhovor` for an inquiry or `Vybrat termín` for selecting a time. Show success only after confirmed delivery or booking. Do not invent a response SLA; leave it for confirmation. New integration is outside this phase.

## 16. Privacy and cookies

Keep editorial notes on both pages. Split them into concrete inputs: the real supplier/controller, processing purposes and methods, services, access, retention, and contact procedure. An outline is not a completed legal assessment.

Technical claims must match reality. A static website does not automatically mean no hosting logs or third-party requests. Inspect existing scripts, fonts, embeds, and forms using available tools. Do not claim GDPR compliance without the necessary evidence.

Do not preemptively add a universal cookie banner when no new services are being activated. Assess consent requirements against actual processing at the later integration stage. Missing legal facts block future data-collection activation, not completion of today's draft interface.

## 17. Visual changes

Preserve a calm, human, professional character. The current palette is approved; this is not a rebrand.

- Inspect existing tokens first. Do not create a duplicate color system or repaint elements that already work well.
- If the CTA needs adjustment, `#62594D` with `#FAF9F6` provides approximately 6.53:1 contrast. Hover `#554D43` and active `#49433B` are options if consistent with the existing style.
- Focus color `#DCC6AA` on `#FAF9F6` provides only approximately 1.57:1 contrast; do not use it as the only indicator. Prefer a dark outline using an existing dark token, or a two-color focus indicator. Check contrast against every adjacent surface.
- Preserve the serif/sans pairing if already in use. Do not add new font services. Do not set weight 650 unless the actual font supports it.
- Shorten headings and subheadings, and reduce repeated pairs of small labels. Keep long copy at a comfortable line length, approximately 60–72 characters where appropriate.
- Separate sections through typography and spacing. Use cards where content needs grouping or interaction.
- Use smaller shadows and restrained corner rounding. Avoid aggressive gradients, autoplay video, and decorative metrics.
- Notes may have a subtle warm background and a textual status. Do not sacrifice their readability for visual cleanliness.
- Use appropriately sized images with known dimensions and suitable loading behavior. Limit motion and respect `prefers-reduced-motion`.

## 18. Technical quality, metadata, and draft indexing

- Preserve the existing HTML/CSS/JS architecture, clean URLs, and working anchors.
- Change affected copy in both HTML fallbacks and CMS JSON. Reflect structural changes in `admin/config.yml` and rendering logic.
- Use one clear H1, logical headings, and a unique Czech title and description for each route.
- Check favicon, social-sharing metadata, and logo consistency. Use only actual available assets. Do not invent a domain or add false structured data, ratings, or reviews.
- Preserve the current domain and OAuth configuration. Track a future custom domain as a separate task.
- For this draft with visible notes, set `noindex` on public HTML routes unless the environment already provides effective equivalent behavior; document the method in README. Do not change authentication or deploy for this purpose. `noindex` is a crawler instruction, not access control.
- When using HTML `noindex`, do not thoughtlessly prevent crawlers from reading it with `Disallow: /`. Check any existing intentional protection before changing it.
- Keep any sitemap consistent with draft status; do not nominate draft noindex pages for indexing. Production indexing belongs to the later launch review.
- Do not install analytics, a chatbot, or automations. A clear offer, useful content, and reliable contact matter more for this website.

## 19. Verification

### Basic checks

```bash
node --check script.js
git diff --check
python -m http.server 8000
```

Syntax-check other modified JavaScript files too. Parse JSON with an actual parser. Validate YAML using an available parser or safe local configuration loading; do not install a new stack solely for validation. Disclose any check that was not performed.

### Verification scenarios

| Area | Required verification |
| --- | --- |
| All 12 routes | Meaningful content, links, headings, headers, and footers |
| CMS text | A local JSON edit appears in the correct place without breaking structure |
| CMS note | An instruction edit appears; unresolved and review-pending notes remain visible |
| Resolved note | Only the note disappears; completed text and photograph remain |
| Photographs | Both an available image and a missing image produce usable output and appropriate alt text |
| Fallback | Missing or invalid JSON does not blank the page or break navigation |
| Situation selection | Multiple selected topics do not generate a diagnosis or transmit data |
| Questionnaire | All answers of 3 do not produce percentages; nonnumeric answers are not zero; missing answers get a clear warning |
| Questionnaire revisited | Answers can be edited and cleared; the result is available without email |
| Contact form | An invalid email produces a clear error; valid test data produces only the truthful preview state |
| Network and data | No new transmission of form/questionnaire content; no response storage in URLs or persistent storage |
| Accessibility | Keyboard, focus, menu, labels, answer selection, errors, and result announcements |
| Mobile | Readable headings, CTAs, tables, questionnaire, notes, and footer without losing core content |

Visually inspect representative pages at 1440, 1024, 768, 390, and 320 px; check all 12 routes at least on desktop and at 390 px. If a browser is available, capture review screenshots of the homepage, collaboration page, profiles, questionnaire, and contact page on desktop and mobile. Also test text enlargement. Do not claim a check passed if the available tools did not allow it.

Verify CMS through a safe local or already approved test workflow. Do not save through connected Decap to `main` just to prove functionality. A local JSON edit, YAML inspection, and a real end-to-end CMS save are three different verification levels; distinguish them in the report.

Do not introduce extensive test infrastructure. Targeted checks are useful for the more complex questionnaire changes, note migration, and truthful form state. Cosmetic changes do not need tests that merely mirror implementation.

## 20. Completion criteria for this draft phase

- [ ] Static architecture, all 12 routes, clean URLs, CMS, and OAuth boundaries are preserved.
- [ ] Content is clear, collaborative, and revised according to this brief.
- [ ] The main CTA leads to the introductory conversation; the offer distinguishes it from the three collaboration formats.
- [ ] Team mapping is not confused with a single commissioning stakeholder's perspective.
- [ ] The process includes agreement with both the team and the commissioning stakeholder and their shared evaluation.
- [ ] Other methods are not disparaged; no unsupported guarantees, prices, testimonials, or qualifications have been added.
- [ ] Editorial notes remain clear, correctly placed, and editable in CMS.
- [ ] Note text and status have one authoritative source; no unresolved task was lost.
- [ ] The coaches can add text or photographs and explicitly mark notes as resolved.
- [ ] The questionnaire is individual reflection without percentages, diagnoses, or mandatory email; it includes nonnumeric responses and reset.
- [ ] An unconnected form clearly shows preview mode and never confirms real delivery.
- [ ] The palette is preserved and focus contrast is sufficient.
- [ ] HTML, JSON, CMS configuration, and repeated shared elements are aligned at handoff.
- [ ] Accessibility, responsiveness, syntax, data, and links have been checked to the extent available tools allow.
- [ ] README explains note editing, local-preview limitations, and separate pre-launch steps; the guide for the coaches is in Czech.
- [ ] No push to `main`, production deployment, or new data integration has occurred.

**Unresolved notes, missing photographs, prices, or legal information do not by themselves mean this phase has failed.** They must be accurately tracked and must not appear to be confirmed facts. A technically broken CMS, false delivery confirmation, or lost content cannot be presented as completed work.

## 21. Separate future production review

For now, record this section in README and the handoff only. Do not automatically switch the site to production.

- The owners confirm copy, credentials, photographs, pricing, durations, and coach staffing.
- Actual contacts, supplier details, and appropriate data-processing information are completed.
- Real delivery or booking is connected and tested end to end after separate approval.
- Actual services, cookies, and data transfers are reviewed again.
- Unfinished sections are completed or deliberately removed. Do not bulk-hide unresolved notes to create the appearance of completion.
- Check the production domain, canonical URLs, sharing metadata, sitemap, and removal of draft `noindex` only from ready pages.
- Check understanding of the offer with several HR and company-leadership representatives. Do not pretend this research has already happened.
- Deploy to production only after an explicit instruction.

## 22. Codex final report

Respond concisely in Czech and state:

1. What changed and in which files.
2. How content is now completed and editorial notes handled in CMS.
3. Which checks actually ran and what remains unverified.
4. What the owners still need to supply and which technical steps belong to the later production stage.
5. That no production deployment or unauthorized integration occurred.

Do not describe the draft as production-ready or treat intentionally retained editorial notes as defects.

## 23. Professional references for content meaning

These references support terminology and principles. They do not establish the individual coaches' qualifications or the effectiveness of their particular program. If extending professional claims, verify an up-to-date primary source; do not promise research-derived numerical outcomes for an individual engagement.

- ICF Team Coaching Competencies: https://coachingfederation.org/credentialing/coaching-competencies/icf-team-coaching-competencies/
- ICF Code of Ethics, version effective 1 April 2025: https://coachingfederation.org/credentialing/coaching-ethics/icf-code-of-ethics/
- ICF Advanced Certification in Team Coaching and the ACTC/AATC distinction: https://coachingfederation.org/credentialing/icf-specializations-overview/actc/
- Edmondson and Bransby, Psychological Safety Comes of Age, 2023: https://www.annualreviews.org/content/journals/10.1146/annurev-orgpsych-120920-055217
- W3C WCAG 2.2, text contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C WCAG 2.2, control and state contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
