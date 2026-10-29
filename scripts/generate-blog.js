// Generates the blog's static data files before `next dev` / `next build`:
//   public/blog/posts.json  - read by the desktop Blog app
//   public/rss.xml          - RSS 2.0 feed
//   public/sitemap.xml      - sitemap for search engines
const fs = require('fs');
const path = require('path');
const { getAllPosts } = require('../lib/blog');
const { SITE_URL } = require('../lib/site');
const { profile } = require('../data/resume');

const publicDir = path.join(__dirname, '..', 'public');

const escapeXml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const postUrl = (post) => `${SITE_URL}/blog/${post.slug}/`;
const isoDate = (date) => (date && !isNaN(new Date(date)) ? new Date(date).toISOString() : null);

function buildRss(posts) {
    const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl(post)}</link>
      <guid isPermaLink="true">${postUrl(post)}</guid>
      ${isoDate(post.date) ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''}
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${profile.name} - Blog`)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>Thoughts, tutorials, and insights on Cloud, DevOps, and Technology</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>
`;
}

function buildSitemap(posts) {
    const pages = [
        { loc: `${SITE_URL}/` },
        { loc: `${SITE_URL}/about/` },
        { loc: `${SITE_URL}/blog/`, lastmod: posts.length ? isoDate(posts[0].date) : null },
        ...posts.map((post) => ({ loc: postUrl(post), lastmod: isoDate(post.date) })),
    ];

    const urls = pages.map((page) => `
  <url>
    <loc>${page.loc}</loc>${page.lastmod ? `
    <lastmod>${page.lastmod.slice(0, 10)}</lastmod>` : ''}
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;
}

try {
    const posts = getAllPosts();

    fs.mkdirSync(path.join(publicDir, 'blog'), { recursive: true });
    fs.writeFileSync(path.join(publicDir, 'blog', 'posts.json'), JSON.stringify(posts, null, 2));
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), buildRss(posts));
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemap(posts));

    console.log(`✅ Generated ${posts.length} blog posts, rss.xml and sitemap.xml`);
} catch (error) {
    console.error('Error generating blog posts:', error);
    process.exit(1);
}
