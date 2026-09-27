export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = "https://team1-beige.vercel.app/api/callback";
  const url =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent("repo user")}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  res.writeHead(302, { Location: url });
  res.end();
}
