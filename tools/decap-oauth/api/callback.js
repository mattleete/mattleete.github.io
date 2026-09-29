// Step 2 of the Decap CMS GitHub login: exchange the one-time code for a
// token and hand it to the CMS window that opened the popup. The page/
// postMessage handshake below is the protocol Decap expects: it announces
// "authorizing:github", waits for the opener to reply, then posts
// "authorization:github:success:{token}" back to the opener.
//
// The token only ever goes to CMS_ORIGIN. GitHub skips its consent screen
// for an app the user has already approved, so any page that opens /auth in
// a popup gets a token back silently — if we answered whoever asked (the
// usual `e.origin` pattern), that page could take it.
const CMS_ORIGIN = process.env.CMS_ORIGIN || "https://mattleete.github.io";

const page = (body) =>
  `<!doctype html><meta charset="utf-8"><title>Signing in…</title><body>${body}</body>`;

// JSON that is safe to drop inside a <script> block.
const scriptJson = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, "http://x");
    const code = url.searchParams.get("code"), state = url.searchParams.get("state");
    const cookieState = ((req.headers.cookie || "").match(/(?:^|;\s*)oauth_state=([^;]+)/) || [])[1];

    if (!code) { res.statusCode = 400; return res.end(page("Missing code.")); }
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
    const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

    res.setHeader("Set-Cookie", "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 200;
    res.end(page(`<script>
    (function () {
      var origin = ${scriptJson(CMS_ORIGIN)};
      var message = ${scriptJson(message)};
      if (!window.opener) return;
      function receive(e) {
        if (e.origin !== origin) return;   // only the CMS gets the token
        window.opener.postMessage(message, origin);
        window.removeEventListener("message", receive, false);
      }
      window.addEventListener("message", receive, false);
      window.opener.postMessage("authorizing:github", origin);
    })();
  </script><p>Signing you in&hellip; you can close this window if it does not close itself.</p>`));
  } catch (err) {
    // Details go to the Vercel logs, not to the browser.
    console.error(err);
    res.statusCode = 500;
    res.end("Sign-in failed. Please try again.");
  }
};
