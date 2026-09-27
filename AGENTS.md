# Repository guide for coding agents

## Scope

- These instructions apply to the whole tracked repository.
- Work from the repository root.
- The nested untracked `team1/` directory is not part of the tracked application; do not edit or stage it unless explicitly requested.

## Stack and package management

- Czech, multi-page website built with semantic HTML, one shared CSS file, and vanilla browser JavaScript.
- No framework, bundler, build step, package manager, `package.json`, or lockfile is present.
- `admin/` contains Decap CMS, loaded from the unpkg CDN and configured with YAML.
- `api/` contains Vercel-style JavaScript serverless functions for GitHub OAuth.
- Production configuration currently targets `https://team1-beige.vercel.app`.

## Commands

- Install: none. There are no local dependencies to install.
- Development preview: `python -m http.server 8000`
- Open the preview at `http://localhost:8000`.
- Build: none; Vercel publishes the repository root and discovers `api/` functions.
- Test: none configured. There is no automated test command or test runner.
- Lint: none configured. There is no automated lint command or formatter.
- The Python static server previews pages only; it does not emulate Vercel functions in `api/`.

## Important paths

- `index.html`: home page.
- `<route>/index.html`: directory-based pages such as `programy/`, `kontakt/`, and `faq/`.
- `styles.css`: all shared design tokens, layout, components, responsive rules, and focus styles.
- `script.js`: navigation, active-page state, year, browser-only form validation, and scorecard behavior.
- `content-todos.js`: centralized unresolved business, legal, content, and technical placeholders.
- `assets/`: committed brand assets.
- `admin/index.html` and `admin/config.yml`: Decap CMS entry point and content model.
- `content/pages/`: Decap-managed page content; currently only a placeholder file is tracked.
- `img/uploads/`: Decap upload destination; currently only a placeholder file is tracked.
- `api/auth.js` and `api/callback.js`: GitHub OAuth redirect and popup handshake.
- `README.md`: current editing and static-preview guidance.

## Existing conventions

- Keep public copy in Czech and retain `lang="cs"`.
- Use two-space indentation in HTML, CSS blocks, YAML, and JavaScript.
- Use root-absolute public URLs such as `/styles.css`, `/script.js`, and `/assets/...`.
- Keep each public route as a folder with its own `index.html`; preserve clean trailing-slash URLs.
- Reuse existing CSS custom properties and component classes before adding new styles.
- Keep responsive changes in `styles.css` and follow its existing mobile breakpoints.
- Preserve semantic landmarks, the skip link, labels, keyboard behavior, visible focus, and ARIA state.
- Prefer progressive enhancement with `data-*` hooks and guard optional DOM elements before use.
- Shared header, navigation, and footer markup is repeated across pages; keep copies consistent when changing it.
- Keep unresolved claims and decisions in `content-todos.js`; do not present placeholders as verified facts.
- Forms are intentionally browser-only and do not submit or store data.

## Boundaries

- Do not introduce React, Vite, npm, a new framework, a build system, or dependencies unless explicitly requested.
- Do not perform drive-by refactors, broad formatting changes, or unrelated copy edits.
- Do not add `.env` files, credentials, OAuth tokens, API keys, or secrets to the repository or logs.
- Keep `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in Vercel environment variables only.
- Do not weaken the OAuth origin checks or change the production callback URL without coordinating the deployment domain and GitHub OAuth App settings.
- Do not connect forms to a service or add data collection without explicit approval and privacy requirements.
- Preserve accessible behavior and verify affected pages at desktop and mobile widths after UI changes.
