// Writes public/tars-context.txt: the plain-text résumé (plus blog post list) that the
// TARS chat Worker (workers/tars) fetches and uses as its system prompt context.
// It's built from data/resume.js, so the chatbot always matches the deployed site.
const fs = require('fs');
const path = require('path');
const { resumeToText } = require('../data/resume');
const { getAllPosts } = require('../lib/blog');
const { SITE_URL } = require('../lib/site');

const outputFile = path.join(__dirname, '..', 'public', 'tars-context.txt');

const posts = getAllPosts();
const blogSection = posts.length
    ? ['', 'BLOG POSTS', ...posts.map((post) => `  - ${post.title} (${post.date}): ${post.excerpt} ${SITE_URL}/blog/${post.slug}/`)]
    : [];

fs.writeFileSync(outputFile, [resumeToText(), ...blogSection, ''].join('\n'));
console.log(`✅ Generated tars-context.txt (${fs.statSync(outputFile).size} bytes)`);
