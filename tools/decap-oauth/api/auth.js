// Step 1 of the Decap CMS GitHub login: send the browser to GitHub's
// authorisation page. Decap opens this in a popup as
//   {base_url}/auth?provider=github&scope=...&site_id=...
// GitHub sends the user back to /callback with a one-time code.
const crypto = require("crypto");

// The scope is fixed here, NOT read from the request: anyone can open this
// URL, so a caller-chosen scope would let a stranger ask for more access than
// the CMS needs. The site repo is public, so public_repo is enough to commit.
const SCOPE = "public_repo";

module.exports = (req, res) => {
  try {
    const clientId = process.env.OAUTH_CLIENT_ID;
    if (!clientId) {
      res.statusCode = 500;
      return res.end("OAUTH_CLIENT_ID is not set in this deployment's environment variables.");
    }

    const state = crypto.randomBytes(16).toString("hex");
    const params = new URLSearchParams({ client_id: clientId, scope: SCOPE, state });

    // The state round-trips through a short-lived cookie so /callback can
    // reject responses it did not initiate.
    res.statusCode = 302;
    res.setHeader("Set-Cookie", `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
    res.setHeader("Location", `https://github.com/login/oauth/authorize?${params}`);
    res.end();
  } catch (err) {
    // Details go to the Vercel logs, not to the browser.
    console.error(err);
    res.statusCode = 500;
    res.end("Sign-in failed. Please try again.");
  }
};
