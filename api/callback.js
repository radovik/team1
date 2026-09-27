export default async function handler(req, res) {
  const code = req.query.code;
  const origin = "https://team1-beige.vercel.app";

  if (!code) {
    res.status(400).send("Missing code");
    return;
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();
  const token = data.access_token;
  const ok = Boolean(token);
  const payload = ok
    ? JSON.stringify({ token, provider: "github" })
    : JSON.stringify(data);
  const status = ok ? "success" : "error";
  const message = `authorization:github:${status}:${payload}`;
  const serializedMessage = JSON.stringify(message).replace(/</g, "\\u003c");
  const serializedOrigin = JSON.stringify(origin);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!DOCTYPE html>
<html lang="cs"><body>
<script>
(function () {
  var openerOrigin = ${serializedOrigin};

  if (!window.opener) {
    document.body.textContent = "Přihlašovací okno ztratilo spojení s administrací.";
    return;
  }

  function receive(event) {
    if (event.source !== window.opener || event.origin !== openerOrigin) {
      return;
    }

    window.opener.postMessage(${serializedMessage}, event.origin);
    window.removeEventListener("message", receive, false);
    window.setTimeout(function () { window.close(); }, 250);
  }

  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", openerOrigin);
})();
</script>
<p>Dokončuji přihlášení…</p>
</body></html>`);
}
