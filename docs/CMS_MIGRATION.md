# Sveltia CMS migration — 24 October 2026

## Scope

- `/admin/` loads Sveltia CMS `0.250.2` from unpkg. It is a prebuilt browser script, not a new Svelte application, npm dependency or build step. The reviewed release is pinned; review upstream security fixes and release notes before upgrading.
- `/admin/decap.html` retains the previous Decap runtime as a fallback. Both entry points explicitly load `/admin/config.yml`; there is no second configuration or content store. Do not edit an entry in both interfaces simultaneously.
- The configuration is unchanged: GitHub `radovik/team1`, branch `main`, `base_url: https://team1-beige.vercel.app`, `auth_endpoint: api/auth`, 12 fixed page entries, shared notes and `img/uploads` media.
- `api/auth.js` and `api/callback.js` are unchanged. The production callback and origin checks remain in place. No credentials, environment settings, scopes, OAuth application or external authenticator were added or changed.
- Public HTML, CSS, JavaScript, JSON, draft notes and routing are unchanged. README and AGENTS.md now describe the primary CMS and fallback.

## Verified locally

**Story:** the editor opens Sveltia, loads the shared configuration, authenticates through the existing GitHub OAuth service, then edits the same JSON and uploaded media. Live GitHub authentication/publication is a separate, still unverified boundary.

| Boundary | Evidence and result |
| --- | --- |
| CMS configuration | Normal local `/admin/` loaded Sveltia and displayed GitHub sign-in. The Decap fallback loaded the same YAML and displayed its Czech GitHub sign-in. Neither login button was used. |
| Collections and content | An isolated official `test-repo` backend was seeded with copies of the 13 current content JSON files. Sveltia listed all 12 pages and the shared-notes entry with 29 notes. Czech UI selection worked. |
| Editing and persistence | Changed the homepage title in the virtual repository, saved and reopened it; the new value persisted. Changed one note instruction and selected `Ke kontrole`, saved and reopened it; both persisted. All three status options were available, and technical fields remained hidden. |
| Media | Uploaded the existing brand PNG strictly as a test fixture, not a coach photograph. The confirmation selected `/img/uploads`, and the virtual media library showed the saved image. No repository upload occurred. |
| OAuth message contract | Ran the existing callback in an isolated Node VM with stubbed fetch and synthetic values. Missing code returned 400; success/error payloads and the `authorizing:github` handshake passed. Wrong origin and wrong source were rejected. No real network requests or credentials were used in this check. |
| Source integrity | Git diff confirmed no changes to `api/`, `admin/config.yml`, public code or content. JSON parsing passed for all 12 pages and the 29-note file. `node --check script.js`, `node --check content-todos.js` and `git diff --check` passed. |

The temporary fixture server, manifest/backend overrides, probes and screenshots live outside the repository. The fixture backend stores data only in the browser's virtual filesystem; it never saves to GitHub or the real content files. A local socket restriction initially blocked the fixture server; it was restarted with approved access, and the browser tests then succeeded.

Sveltia logged compatibility warnings for Decap's `locale` setting and `required` on hidden fields; it ignores those options. No runtime error was returned in the isolated test's console error check. The shared configuration is intentionally retained for Decap compatibility. Sveltia chooses its UI language from the browser or the account language setting, not `locale: cs`; Czech field labels/help text remain in the YAML.

Screenshot: `sveltia-cms-local-collections.jpg` in the task's external visualization directory shows the seeded Czech collection list, not a production or GitHub-authenticated session.

## Not verified / next authorized step

- The local verification above was completed before any commit, push or deployment of the migration. Publication is a separately authorized release; those local checks do not establish the live deployment status.
- Actual Sveltia GitHub sign-in, token reuse from Decap, upload to GitHub, content commit and resulting deployment were not tested end to end. The documented compatibility and isolated tests are not proof of these live operations.
- No new Vercel environment variables should be required: the existing `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are still consumed only by the unchanged server functions. Their live presence or values were not inspected in this task.
- After an approved deployment, open `https://team1-beige.vercel.app/admin/` and use GitHub sign-in. Complete a genuinely intended content edit and check its commit and public result; do not create a dummy commit on `main` solely for testing. Use an explicitly approved non-production setup for a full disposable save test.
- If Sveltia has a compatibility problem, use `/admin/decap.html` with the same GitHub sign-in. Keep unsaved edits in only one interface.
- A preview URL or localhost does not satisfy the unchanged production callback's origin check. Do not relax that check for testing.

## References

- [Official Decap migration and authentication compatibility](https://sveltiacms.app/en/docs/migration/netlify-decap-cms)
- [GitHub backend and existing OAuth clients](https://sveltiacms.app/en/docs/backends/github)
- [Test backend and seed manifests](https://sveltiacms.app/en/docs/backends/test)
- [UI language settings](https://sveltiacms.app/en/docs/ui)
- [Release notes](https://github.com/sveltia/sveltia-cms/releases)
