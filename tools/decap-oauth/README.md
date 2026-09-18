# decap-oauth

The GitHub login helper for the site's CMS (`/admin/`). GitHub Pages cannot run
the server-side step of GitHub OAuth, so this tiny Vercel project does it:

- `GET /auth` — redirects to GitHub's authorise page
- `GET /callback` — swaps the code for a token and posts it to the CMS window

## One-time setup (Matt)

1. GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App
   - Homepage URL: `https://mattleete.github.io`
   - Authorization callback URL: `https://mattleete-github-io.vercel.app/callback`
2. In the Vercel project → Settings → Environment Variables, add
   `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` from the OAuth App, then redeploy.
3. `src/admin/config.yml` → `backend.base_url` must be this project's URL.

No dependencies; nothing to install. Deployed from this folder with
`rootDirectory: tools/decap-oauth`.
