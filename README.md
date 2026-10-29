# Win Yan Naing Htut - Portfolio Website

This is the personal portfolio website of **Win Yan Naing Htut**, designed with an Ubuntu 20.04 desktop simulation theme. Built using Next.js and Tailwind CSS, it showcases experience, projects, certifications, skills and a blog in an interactive desktop environment.

Live site: [portfolio.winyan.dev](https://portfolio.winyan.dev)

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher (CI builds with Node 20)
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

`NEXT_PUBLIC_*` values are inlined at build time. Locally, put them in `.env.local`. For the deployed site, add a repository variable with the same name under **Settings → Secrets and variables → Actions → Variables**; the deploy workflow passes it to the build.

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (Pages Router, static export)
- **Styling**: Tailwind CSS + `@tailwindcss/typography` (blog posts)
- **Blog**: Markdown rendered with `react-markdown`
- **Analytics**: Google Analytics 4 via `react-ga4` (optional)
- **Hosting**: GitHub Pages
- **Theme**: Ubuntu 20.04 Desktop Simulation

## 📁 Project Structure

```
apps.config.js      # Registry of desktop apps (id, title, icon, dock/desktop flags, screen)
components/
├── apps/           # Desktop applications (About, Blog, Terminal, Chrome, Calc, etc.)
├── base/           # Window, desktop icon and dock icon components
├── context menus/  # Right-click context menus
├── screen/         # Desktop, navbar, sidebar, boot and lock screens
└── util components/# Clock, status card, background image, etc.
pages/              # Next.js pages
public/             # Static assets
├── blog/posts/     # Blog post markdown files
└── files/          # Resume PDF
scripts/            # Build scripts (blog generation)
styles/             # Global styles
```

## ✨ Features

- Interactive Ubuntu desktop simulation (draggable windows, dock, app grid, lock screen)
- About app with experience, projects, certifications, education, skills and contact
- Resume viewer and download
- Blog system with Markdown support for technical posts
- Fake terminal with `ls`, `cd`, `mkdir`, and commands that open other apps
- Responsive design

## 📜 Available Scripts

### `npm run dev`
Generates `public/blog/posts.json`, then runs the development server on [http://localhost:3000](http://localhost:3000).
Restart it after adding or editing a blog post.

### `npm run build`
Generates `public/blog/posts.json`, then builds and statically exports the site to `out/`.

### `npm run lint`
Runs ESLint to check for code quality issues.

## ✍️ Blog Management

To create a new blog post, add a markdown file to `public/blog/posts/` with the following format:

```markdown
---
title: Your Post Title
date: YYYY-MM-DD
excerpt: A brief description.
---

# Your Post Title

Your content goes here. You can use standard markdown formatting.
```

The blog system automatically:
- Parses front matter (title, date, excerpt)
- Generates `posts.json` before `dev` and `build`
- Renders posts in the Blog app with full markdown support
- Sorts posts by date (newest first)

## 🚀 Deployment

The site is hosted on **GitHub Pages**. Every push to `main` runs `.github/workflows/nextjs.yml`, which builds the static export (`out/`) and deploys it.

Because GitHub Pages only serves static files:
- There are no API routes, server-side rendering or runtime environment variables. Anything dynamic must run in the browser or be generated at build time (like `posts.json`).
- Reference assets with relative paths (`./images/...`), so the site keeps working if it is ever served from a subpath instead of the custom domain.

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
