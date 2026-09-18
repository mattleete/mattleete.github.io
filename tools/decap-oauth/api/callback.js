// Step 2 of the Decap CMS GitHub login: exchange the one-time code for a
// token and hand it to the CMS window that opened the popup. The page/
// postMessage handshake below is the protocol Decap expects: it announces
// "authorizing:github", waits for the opener to reply, then posts
// "authorization:github:success:{token}" back to the opener's origin.

const page = (body) =>
  `<!doctype html><meta charset="utf-8"><title>Signing in…</title><body>${body}</body>`;

module.exports = async (req, res) => {
  try {
  const url = new URL(req.url, "http://x");
  const code = url.searchParams.get("code"), state = url.searchParams.get("state");
  const cookieState = ((req.headers.cookie || "").match(/(?:^|;\s*)oauth_state=([^;]+)/) || [])[1];

  if (!code) return res.status(400).send(page("Missing code."));
  if (!state || state !== cookieState) { res.statusCode = 400; return res.end(page("State mismatch — please try signing in again.")); }

  const r = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
      state,
    }),
  });
  const data = await r.json();

  const status = data.access_token ? "success" : "error";
  const payload = data.access_token
    ? { token: data.access_token, provider: "github" }
    : { error: data.error_description || data.error || "Unknown error", provider: "github" };

  res.setHeader("Set-Cookie", "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.statusCode = 200;
  res.end(page(`<script>
    (function () {
      var message = "authorization:github:${status}:" + ${JSON.stringify(JSON.stringify(payload))};
      function receive(e) {
        window.opener.postMessage(message, e.origin);
        window.removeEventListener("message", receive, false);
      }
      window.addEventListener("message", receive, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script><p>Signing you in&hellip; you can close this window if it does not close itself.</p>`));
  } catch (err) {
    res.statusCode = 500;
    res.end("callback failed: " + (err && err.stack || err));
  }
};
