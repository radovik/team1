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

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!DOCTYPE html>
<html><body>
<script>
(function () {
  function receive(e) {
    if (e.data === "authorizing:github") {
      e.source.postMessage(${JSON.stringify(message)}, ${JSON.stringify(origin)});
    }
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage(${JSON.stringify(message)}, ${JSON.stringify(origin)});
})();
</script>
<p>Přihlášení dokončeno. Toto okno můžete zavřít.</p>
</body></html>`);
}
