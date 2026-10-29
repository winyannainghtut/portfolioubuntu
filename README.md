# Win Yan Naing Htut - Portfolio Website

This is the personal portfolio website of **Win Yan Naing Htut**, designed with an Ubuntu 20.04 desktop simulation theme. Built using Next.js and Tailwind CSS, it showcases experience, projects, certifications, skills and a blog in an interactive desktop environment, with plain pages for phones and search engines.

Live site: [portfolio.winyan.dev](https://portfolio.winyan.dev)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18 or higher (CI builds with Node 20)
- npm

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/winyannainghtut/portfolioubuntu.git
   cd portfolioubuntu
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables (optional)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Analytics is disabled when unset. |
| `NEXT_PUBLIC_TARS_API_URL` | URL of the deployed TARS chat Worker (see [`workers/tars`](workers/tars/README.md)). TARS runs in offline mode when unset. |

`NEXT_PUBLIC_*` values are inlined at build time. Locally, put them in `.env.local`. For the deployed site, add repository variables with the same names under **Settings → Secrets and variables → Actions → Variables**; the deploy workflow passes them to the build.

## ✨ Features

- **Ubuntu desktop simulation**: draggable windows, dock, app grid, lock screen, wallpapers
- **About app**: experience, projects (with live GitLab activity and languages), certifications (Credly badges), education, skills, contact, résumé viewer
- **Simple view** at [`/about/`](https://portfolio.winyan.dev/about/): the same content as one scrollable, pre-rendered page for phones and search engines
- **Blog**: Markdown posts in the desktop Blog app *and* as shareable pages at `/blog/<slug>/`, with syntax highlighting, reading time, an RSS feed (`/rss.xml`) and a sitemap (`/sitemap.xml`)
- **Terminal**: `help`, `ls`, `cd`, `cat resume`, `open`, `neofetch`, `kubectl get pods`, `terraform plan`, `history`, Tab completion, and commands that open other apps
- **Files app**: browse the same virtual home folder as the terminal
- **Ask TARS**: a résumé Q&A chatbot (AI-backed via a Cloudflare Worker, or offline)
- **Keyboard shortcuts**: `Ctrl+Alt+T` terminal · `Alt+F1` or `Super` app grid · `Esc` close grid · `Ctrl+Alt+W` close window; `Enter` opens a focused icon
- **Deep links**: `/?post=<slug>` opens a blog post in the desktop, `/?app=<id>` opens any app (e.g. `/?app=terminal`)
- Phones open the About app full-screen automatically

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (Pages Router, static export)
- **Styling**: Tailwind CSS + `@tailwindcss/typography`
- **Blog**: Markdown via `react-markdown` + `rehype-highlight`
- **Chatbot backend**: Cloudflare Worker + Anthropic SDK (`workers/tars`)
- **Analytics**: Google Analytics 4 via `react-ga4` (optional)
- **Hosting**: GitHub Pages

## 📁 Project Structure

```
apps.config.js      # Registry of desktop apps (id, title, icon, dock/desktop flags, screen)
data/
├── resume.js       # ⭐ All résumé content - edit this to update the site, terminal, Files app and TARS
└── filesystem.js   # Virtual home folder shared by Terminal and Files
components/
├── apps/           # Desktop applications (About, Blog, Terminal, Files, TARS, Calc, etc.)
├── base/           # Window, desktop icon and dock icon components
├── blog/           # Markdown renderer shared by the Blog app and blog pages
├── screen/         # Desktop, navbar, sidebar, boot and lock screens
├── site/           # Layout for the plain pages (/about/, /blog/)
└── ...
lib/                # Blog loader, site constants, helpers
pages/              # Next.js pages: / (desktop), /about/, /blog/, /blog/[slug]/
public/             # Static assets
├── blog/posts/     # Blog post markdown files
└── files/          # Resume PDF
scripts/            # Build-time data generation (see `npm run generate`)
workers/tars/       # Cloudflare Worker for the TARS chatbot (deployed separately)
```

## 📜 Available Scripts

### `npm run dev`
Runs `npm run generate`, then the development server on [http://localhost:3000](http://localhost:3000).
Restart it after adding or editing a blog post.

### `npm run build`
Runs `npm run generate`, then builds and statically exports the site to `out/`. Preview it with any static server, e.g. `npx serve out`.

### `npm run generate`
Writes the generated files in `public/` (all gitignored):
- `blog/posts.json`, `rss.xml`, `sitemap.xml` from the Markdown posts
- `projects.json` with GitLab activity/language stats for the repos in `data/resume.js` (if GitLab can't be reached, the previous file is kept and the build continues)
- `tars-context.txt`, the plain-text résumé used by the TARS Worker

### `npm run lint`
Runs ESLint. CI runs it before every deploy.

## ✍️ Updating content

- **Résumé** (experience, projects, certifications, education, skills): edit `data/resume.js`, and replace `public/files/WinYanNaingHtut_2026.pdf` with the new CV.
- **Blog post**: add a markdown file to `public/blog/posts/`:

  ```markdown
  ---
  title: Your Post Title
  date: YYYY-MM-DD
  excerpt: A brief description.
  ---

  # Your Post Title

  Your content goes here. Fenced code blocks (```bash, ```yaml, ...) are syntax-highlighted.
  ```

## 🚀 Deployment

The site is hosted on **GitHub Pages**. Every push to `main` runs `.github/workflows/nextjs.yml`, which lints, builds the static export (`out/`) and deploys it.

Because GitHub Pages only serves static files:
- There are no API routes, server-side rendering or runtime environment variables. Anything dynamic runs in the browser, is generated at build time (like `posts.json`), or lives elsewhere (like the TARS Worker).
- Reference assets with paths that work from any page: `./images/...` only inside the desktop (`/`); in components shared with `/about/` or `/blog/` use `useAssetPath()` from `lib/asset-path.js`, which also handles a GitHub Pages subpath.

## Credits

This portfolio website is based on the amazing Ubuntu desktop simulation template originally created by **Vivek Patel**. The original project can be found at:
- Original Repository: [vivek9patel/vivek9patel.github.io](https://github.com/vivek9patel/vivek9patel.github.io)
- Original Portfolio: [vivek9patel.github.io](https://vivek9patel.github.io)

Special thanks to Vivek Patel for creating this innovative Ubuntu desktop simulation concept and making it open source for the community to use and adapt.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Win Yan Naing Htut**
- LinkedIn: [linkedin.com/in/wynh](https://linkedin.com/in/wynh)
- GitLab: [gitlab.com/winyannainghtut](https://gitlab.com/winyannainghtut)
- GitHub: [github.com/winyannainghtut](https://github.com/winyannainghtut)
- Email: winyannainghtut98@gmail.com
