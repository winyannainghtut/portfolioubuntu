// Blog post loading, shared by scripts/generate-blog.js (posts.json, RSS, sitemap)
// and the static blog pages' getStaticProps. CommonJS so the build script can require it.
const fs = require('fs');
const path = require('path');

const POSTS_DIRECTORY = path.join(process.cwd(), 'public', 'blog', 'posts');
const WORDS_PER_MINUTE = 200;

// Front matter values may optionally be wrapped in quotes
function frontMatterValue(frontMatter, key) {
    const match = frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return match ? match[1].trim().replace(/^(['"])(.*)\1$/, '$2') : undefined;
}

function parsePost(filename, fileContents) {
    // Normalize line endings for cross-platform compatibility
    const normalized = fileContents.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    let frontMatter = '';
    let content = normalized;
    const frontMatterMatch = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (frontMatterMatch) {
        frontMatter = frontMatterMatch[1];
        content = frontMatterMatch[2];
    }

    const slug = filename.replace(/\.md$/, '');
    const words = content.split(/\s+/).filter(Boolean).length;

    return {
        slug,
        title: frontMatterValue(frontMatter, 'title') || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        date: frontMatterValue(frontMatter, 'date') || '',
        excerpt: frontMatterValue(frontMatter, 'excerpt') || content.substring(0, 150).replace(/[#*`]/g, '').trim() + '...',
        readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        content,
    };
}

/**
 * All posts in public/blog/posts, newest first.
 */
function getAllPosts() {
    if (!fs.existsSync(POSTS_DIRECTORY)) return [];

    return fs.readdirSync(POSTS_DIRECTORY)
        .filter((file) => file.endsWith('.md') && file !== 'README.md')
        .map((filename) => parsePost(filename, fs.readFileSync(path.join(POSTS_DIRECTORY, filename), 'utf8')))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getPostBySlug(slug) {
    return getAllPosts().find((post) => post.slug === slug) || null;
}

module.exports = { getAllPosts, getPostBySlug };
