# TARS chat Worker

A Cloudflare Worker that powers the **Ask TARS** app on the portfolio. GitHub Pages can only serve static files, so it can't hold an API key; this Worker keeps the Anthropic API key server-side and answers visitors' questions about the résumé.

How it works:

1. The site's build writes `public/tars-context.txt` (the résumé as plain text, generated from `data/resume.js`).
2. The browser sends the chat history to the Worker.
3. The Worker adds a fixed system prompt containing that résumé text and calls Claude (`claude-opus-5-5`, low effort, prompt caching on the system prompt, server-side refusal fallback enabled).

Without the Worker, the TARS app still works in **offline mode**, answering from a small built-in index of the résumé.

## Deploy

```bash
cd workers/tars
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY   # paste an API key from console.anthropic.com
npx wrangler deploy                         # prints https://tars-chat.<your-subdomain>.workers.dev
```

Then point the site at it:

1. In the GitHub repo: **Settings → Secrets and variables → Actions → Variables → New repository variable**
   - Name: `NEXT_PUBLIC_TARS_API_URL`
   - Value: the Worker URL printed by `wrangler deploy`
2. Re-run the **Deploy Next.js site to Pages** workflow (or push a commit).

## Configuration (`wrangler.toml` → `[vars]`)

| Variable | Purpose |
|----------|---------|
| `SITE_URL` | Where `tars-context.txt` is fetched from |
| `ALLOWED_ORIGINS` | Comma-separated origins allowed to call the Worker |
| `OWNER_NAME` | Name used in the system prompt |
| `MODEL` | Claude model ID (default `claude-opus-5-5`) |

## Cost and abuse protection

The endpoint is public. It only accepts requests from `ALLOWED_ORIGINS`, caps conversations at 20 messages of up to 2,000 characters, and limits each reply's length. A non-browser client can fake the `Origin` header, though, so **set a monthly spend limit for the API key in the Anthropic Console**.
