# Silný tým

Český více-stránkový web pro společnou B2B praxi Martiny Jonášové a Veroniky Vojtové. Web používá pouze HTML, CSS a vanilla JavaScript. Nemá build krok, backend ani externí závislosti.

## Struktura webu

- `/` — Úvod
- `/pro-koho/` — Pro koho
- `/jak-pracujeme/` — Jak pracujeme
- `/programy/` — Programy
- `/vysledky/` — Výsledky
- `/pro-hr/` — Pro HR a nákup
- `/o-nas/` — O nás
- `/faq/` — Časté otázky
- `/kontakt/` — Kontakt / Team Health Audit
- `/team-health-scorecard/` — interaktivní scorecard
- `/soukromi/` a `/cookies/` — právní stránky k doplnění

Sdílený design je v `styles.css`, interakce v `script.js` a všechny otevřené obsahové nebo obchodní otázky jsou centralizované v `content-todos.js`. Logo je uložené jako `assets/silny-tym-mark.png`.

## Editace obsahu

Každá stránka má vlastní `index.html` ve své složce. Před veřejným spuštěním projděte viditelné žluté TODO bloky a odpovídající položky v `content-todos.js`. Zejména je nutné doplnit:

- ceny;
- smluvní a GDPR model;
- ověřené reference;
- profesní profil Martiny;
- autentické fotografie;
- cílovou službu formuláře a společný rezervační kalendář;
- schválené finální znění otázek scorecardu.

Formulář je záměrně pouze front-endový: ověří pole v prohlížeči, ale nic neodesílá ani neukládá.

## Lokální náhled

Otevřete složku v editoru a spusťte libovolný statický HTTP server. Kvůli absolutním cestám a čistým adresám stránek nepoužívejte dvojklik na HTML soubory.

For example, if Python is installed:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub or GitLab.
2. In Cloudflare, open **Workers & Pages**, choose **Create**, then **Pages** and connect the repository.
3. Select the repository and use these build settings:
   - Framework preset: **None**
   - Build command: leave empty
   - Build output directory: `/`
4. Save and deploy.

Cloudflare Pages zveřejní kořenové `index.html` a adresářové stránky bez build kroku. Další push do produkční větve web automaticky aktualizuje.

Nejsou potřeba proměnné prostředí, secrets, API klíče, npm balíčky ani serverová konfigurace.

Anglická verze zatím není součástí webu. Podle obsahové specifikace má vzniknout až po potvrzení reálné obchodní potřeby a jazykového rozsahu obou kouček.
