// Step 1 of the Decap CMS GitHub login: send the browser to GitHub's
// authorisation page. Decap opens this in a popup as
//   {base_url}/auth?provider=github&scope=repo&site_id=...
// GitHub sends the user back to /callback with a one-time code.
const crypto = require("crypto");

module.exports = (req, res) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) return res.status(500).send("OAUTH_CLIENT_ID is not set");

  const state = crypto.randomBytes(16).toString("hex");
  const scope = (req.query && req.query.scope) || "repo,user";
  const params = new URLSearchParams({ client_id: clientId, scope, state });

  // The state round-trips through a short-lived cookie so /callback can
  // reject responses it did not initiate.
  res.setHeader("Set-Cookie", `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};
