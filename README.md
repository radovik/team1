# Silný tým

Český více-stránkový web pro společnou B2B praxi Martiny Jonášové a Veroniky Vojtové. Veřejná část používá pouze HTML, CSS, JSON a vanilla JavaScript bez build kroku. Dvě funkce v `api/` zajišťují GitHub OAuth pro Decap CMS.

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

Sdílený design je v `styles.css`, interakce a načítání obsahu v `script.js` a všechny otevřené obsahové nebo obchodní otázky jsou centralizované v `content-todos.js`. Logo je uložené jako `assets/silny-tym-mark.png`.

Vzhled vychází z exportu Stitch: teplé světlé plochy, bronzové akcenty a písmo Plus Jakarta Sans načítané standardním odkazem z Google Fonts (s lokálním systémovým fallbackem). Barvy a další sdílené tokeny upravujte v `:root` v `styles.css`. Ikony jsou vložené SVG, bez Tailwind runtime nebo knihovny ikon. Úvodní animace používají CSS, odhalování karet `IntersectionObserver`; nastavení sníženého pohybu animace vypíná.

## Editace obsahu

Každá stránka má vlastní `index.html` ve své složce a odpovídající JSON v `content/pages/`. HTML obsahuje bezpečnou výchozí kopii, která zůstane viditelná, když se JSON nepodaří načíst. Po načtení stránky `script.js` nahradí editovatelné texty daty z JSON.

Obsah se spravuje na `https://team1-beige.vercel.app/admin/`. Decap CMS používá GitHub backend a ukládá změny přímo jako commity do větve `main`; redakční workflow není zapnuté. Nahrané obrázky ukládá do `img/uploads/` a ve veřejném obsahu používá cesty `/img/uploads/...`.

Před veřejným spuštěním projděte viditelné žluté TODO bloky a odpovídající položky v `content-todos.js`. Zejména je nutné doplnit:

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

Lokální server načte stránky i jejich JSON. Přihlášení do `/admin` funguje pouze na nasazení ve Vercelu, protože OAuth callback a povolený origin používají produkční adresu.

## Nasazení na Vercel

1. Pushněte větev `main` do GitHub repozitáře `radovik/team1`.
2. Vercel projekt musí zůstat propojený s tímto repozitářem a publikovat kořen repozitáře bez build příkazu.
3. V nastavení Vercelu musí být pro produkční prostředí nastavené `GITHUB_CLIENT_ID` a `GITHUB_CLIENT_SECRET`. Jejich hodnoty nikdy neukládejte do repozitáře.
4. Callback GitHub OAuth aplikace musí zůstat `https://team1-beige.vercel.app/api/callback`.

Vercel zveřejní statické stránky a serverless funkce z `api/`. Další push do `main` spustí nové nasazení. Nejsou potřeba npm balíčky ani lokální `.env` soubor.

Anglická verze zatím není součástí webu. Podle obsahové specifikace má vzniknout až po potvrzení reálné obchodní potřeby a jazykového rozsahu obou kouček.
