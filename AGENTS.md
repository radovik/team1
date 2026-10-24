# Silný tým — Codex project instructions

## Scope and current phase

Place this file in the root of the target Silný tým repository. It applies to the entire tracked project. Work from the repository root. The nested, untracked `team1/` directory is not part of the tracked application; do not edit it or add it to a commit unless explicitly instructed.

**The current deliverable is a working draft that the two coaches can complete in Decap CMS. This is not a production launch.**

- Visible editorial notes about missing copy, photographs, prices, credentials, and operational decisions are intentional and explicitly required by the user in this phase.
- Keep these notes beside the relevant content, distinguish them visually, and let the coaches edit them and explicitly mark them as resolved in CMS.
- Do not hide all notes, move them exclusively into JavaScript, or require their removal to complete this draft.
- Unresolved information must not appear to be verified fact. Distinguish proposed copy from confirmed information.
- Production preparation is a separate future phase. This task does not authorize pushing to `main`, deploying, or connecting personal-data collection.

The detailed task is in `CODEX_IMPLEMENTATION_BRIEF.md`. These two new files supersede older project instructions in `AGENTS(1).md`, `AGENTS.revised(1).md`, and `CODEX_GPT6_1_SOL_HIGH_IMPLEMENTATION_BRIEF(1).md` if those files are supplied as historical references. Do not restore their superseded directions: removing all notes, using Team Health Audit as the primary offer, presenting four equivalent programs, or showing team-health percentages. Current explicit user instructions take precedence over these project documents; higher-priority system and security instructions still apply.

## Language policy

- Write implementation instructions and developer-facing technical documentation in English.
- Keep all website copy, CMS labels and help text, editorial notes, validation messages, accessibility text, and page metadata in Czech.
- Preserve explicitly supplied Czech copy, including diacritics. Do not translate it into English or replace approved wording with English equivalents.
- Write the coach-facing CMS editing guide in Czech, including when it is a dedicated section of an otherwise English `README.md`.
- Keep code identifiers, paths, URLs, and machine-readable status values unchanged unless a functional requirement explicitly calls for a change.
- Communicate with the user and provide the final implementation report in Czech.

## Stack and local preview

Expected baseline from the supplied materials; verify it against the actual repository:

- A Czech multipage website using semantic HTML, shared CSS, and vanilla JavaScript.
- No framework, bundler, build step, package manager, or local dependencies.
- Decap CMS in `admin/`, loaded from unpkg and configured in YAML.
- Vercel serverless functions in `api/` for GitHub OAuth.
- Existing reference URL: `https://team1-beige.vercel.app/`.

Commands:

```bash
python -m http.server 8000
node --check script.js
git diff --check
```

Local preview: `http://localhost:8000`. The Python server serves HTML and JSON but does not emulate Vercel functions or GitHub OAuth. The baseline materials do not define a test runner, linter, or build process. Do not invent these commands or add dependencies solely for this task.

## Important files

| Location | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `<route>/index.html` | Separate pages with clean URLs |
| `styles.css` | Colors, typography, layout, components, responsive rules, and focus styles |
| `script.js` | Navigation, JSON content, contact form, and reflection questionnaire |
| `content-todos.js` | Existing unresolved-task registry; verify the actual implementation |
| `content/pages/` | JSON content for the 12 public routes |
| `admin/index.html`, `admin/config.yml` | Decap CMS and its content model |
| `assets/` | Existing brand assets |
| `img/uploads/` | Uploaded photographs and other CMS media |
| `api/auth.js`, `api/callback.js` | GitHub OAuth |
| `README.md` | Local preview and editing instructions |

## Repository workflow

- Read relevant files and check `git status` first. Preserve the user's existing work.
- Use `rg` for searches. Keep changes within the task's scope.
- Do not introduce React, Next.js, Vite, npm, another framework, a build system, or additional dependencies.
- Preserve two-space indentation in HTML, CSS, YAML, and JavaScript according to local conventions.
- Preserve `lang="cs"`, root-relative public paths such as `/styles.css`, `/script.js`, and `/assets/...`, and clean URLs ending in `/`.
- Preserve `/programy/`, `/vysledky/`, and `/team-health-scorecard/` even when their visible labels change.
- Shared headers and footers are repeated in HTML. Update all copies and relevant CMS content consistently.
- Reuse existing CSS variables, components, and `data-*` hooks. Keep responsive styles in `styles.css`.
- Preserve progressive enhancement: missing or invalid JSON must not leave a blank page or break navigation.
- Never put credentials, tokens, `.env` files, or secret keys in source files, logs, or output.
- Do not change OAuth origin checks, the production callback, or the Decap backend. Keep `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in Vercel environment configuration only.
- Do not switch Decap to `git-gateway`, add Netlify Identity, or perform an unrelated editorial-workflow migration.
- Do not push to `main` or start a deployment without explicit authorization. CMS verification must not accidentally create a commit on the connected production branch.

## CMS and editorial notes

- Preserve each public `<main>` element's `data-content-file` link to its JSON file.
- When changing structure, update the HTML fallback, JSON, rendering logic, and explicit file definition in `admin/config.yml` together.
- Align the meaning of HTML fallback content and JSON during this implementation. Later CMS edits must correctly replace the intended content after JSON loads; do not promise automatic static HTML regeneration without an existing mechanism.
- Render CMS text through DOM text APIs and the existing limited inline formatter. Do not use unchecked raw HTML or `eval`.
- Editors must not need CSS selectors, HTML, or JavaScript to edit content.
- Manage visible notes as separate editorial content with editable text and status in CMS. Reuse the current model where possible; otherwise extend it minimally.
- Each note needs a stable technical ID, a section association, a clear title, an instruction, and a status: `needs_input`, `ready_for_review`, or `resolved`. Technical IDs and associations are not ordinary editor-facing fields.
- Display unresolved notes beside their sections in the draft. Keep `ready_for_review` visible too. Hide `resolved` only after an editor explicitly selects that status; a nonempty field does not prove verification.
- Finished content and editorial instructions are separate fields. Resolving a note must not remove the completed content.
- Do not create two authoritative copies of a note. If its current text comes from `content-todos.js`, preserve its ID and context while making CMS its single editable source. The registry may remain a technical index or fallback, but must not overwrite newer CMS values.
- Do not lose any unresolved task during migration. Merge similar notes only if their meaning and placement are preserved.
- Add a short Czech guide to `README.md` explaining how to complete text, upload a photograph, and resolve a note.

## Website content and tone

- Write Czech website copy in a calm, concrete, collaborative voice. Use `týmový koučink` as the main service term. Use English terms only where useful, such as the accurate name of a qualification.
- Primary navigation CTA: `Domluvit úvodní rozhovor`. Introductory offer: `Úvodní rozhovor`. Form and calendar buttons must truthfully describe their actual actions.
- Present an introductory conversation and three collaboration formats. Do not count the initial conversation as a fourth equivalent program.
- Do not present a short conversation with one commissioning stakeholder as an objective diagnosis of the entire team.
- Replace `sponsor` with `zadavatel` and briefly explain the role. Prefer `tým vedení`, `odpovědnost za dohodu`, `společné vyhodnocení`, and everyday Czech.
- Do not disparage facilitation, team building, training, or individual coaching. Explain the choice of approach in terms of the client's needs.
- Do not promise the elimination of conflict, guaranteed business results, automatic team independence, or universal change within 90 days.
- Include an agreement developed with the team, its strengths, and its organizational conditions. Do not frame team work as fixing one person or requiring personal disclosure.
- Do not invent prices, client outcomes, statistics, testimonials, logos, biographies, qualifications, contractual terms, years of experience, contacts, or legal facts. Clearly mark missing facts for completion.
- ACC is an individual credential; AATC is accreditation of a training program; ACTC is a separate team-coaching certification. Do not conflate them. Verify evidence for the particular person.
- Label illustrative examples as illustrative; do not present them as case studies.

## Questionnaire and forms

- The reflection questionnaire represents one respondent's perspective, not the objective health of the entire team.
- Do not show team-health percentages, normative bands, diagnoses, or a rule that three or more selected symptoms indicate a problem.
- Offer `Nemohu posoudit` and `Netýká se nás`. Neither response is zero or the lowest rating.
- Make the result available without an email address. Do not send responses or form content to analytics, URLs, logs, or persistent browser storage.
- The supplied materials describe the contact form as unconnected. The draft may allow local validation testing but must clearly state that nothing is sent.
- Never display `Odesláno`, `Rezervováno`, or an equivalent success message without confirmation of the corresponding real operation.
- An endpoint, email address, or calendar appearing in code is not evidence of authorization to activate it.
- Do not connect new form services, calendars, analytics, AI, call recording, video embeds, or other data collection without explicit authorization and the necessary operational information.

## Visual style and accessibility

- Preserve the warm neutral palette the owner likes. Color changes must serve contrast, readability, or meaning.
- Preserve the existing brand logo and its colors. Do not introduce new accents or redraw the brand without a request.
- Prioritize readable headings, balanced spacing, subtle section separation, and authentic photographs. Reduce unnecessary cards, shadows, and decoration.
- Do not present stock or generated portraits as photographs of the coaches. Until real photographs are supplied, use a dignified text or monogram treatment with a CMS completion note.
- Normal-size text needs at least 4.5:1 contrast; large text and applicable custom control/state indicators need at least 3:1 under the relevant WCAG criterion.
- `#DCC6AA` on a cream background is insufficient as the sole focus indicator. Use a sufficiently contrasting dark or two-color outline and check both light and dark backgrounds.
- Preserve semantic landmarks, a skip link, logical headings, field labels, keyboard operation, and visible, unobscured focus.
- Expose menu state, selections, errors, and results to assistive technologies. Do not rely solely on color or hover.
- Verify desktop and mobile, especially 390 px; core content must also work at 320 px. Respect text enlargement and reduced-motion preferences.

## Verification and draft completion

- Verify all 12 routes, links, consistent headers and footers, and CMS content loading.
- Exercise missing JSON, keyboard use, the mobile menu, the form without delivery, and different questionnaire states.
- Locally verify changes to CMS JSON for text, editorial notes, note status, and photographs. If real Decap login/save cannot be safely tested, say so explicitly; YAML inspection is not an end-to-end CMS test.
- Run `node --check script.js`, syntax checks for other changed JavaScript files, and `git diff --check`. Validate changed JSON and YAML with available tools without installing a new test stack.
- Search for `doplnit`, `k potvrzení`, `pracovní verze`, `před spuštěním`, `TODO`, and `placeholder`. The correct outcome in this phase is controlled placement in editorial notes, not zero occurrences.
- Check for outdated CTAs, offer names, and percentage scores. Old terms may remain in historical references or explanations of the change, but must not accidentally remain in the active offer.
- Missing photographs, biographies, prices, or legal facts are not a reason to stop other implementation. Preserve their notes and finish everything that does not require inventing facts.
- Report changed files, key changes, checks actually performed, unverified areas, and remaining CMS inputs in Czech.
- Do not claim production readiness or deployment is complete. Future launch criteria are separate in the implementation brief.
