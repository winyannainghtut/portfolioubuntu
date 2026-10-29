// Fetches last-activity and language stats for the GitLab repos listed in data/resume.js
// and writes public/projects.json (read by the Projects section). Runs before dev/build.
// Never fails the build: if GitLab is unreachable, the site just shows no stats.
const fs = require('fs');
const path = require('path');
const { links, projects, moreLabs } = require('../data/resume');

const outputFile = path.join(__dirname, '..', 'public', 'projects.json');
const username = links.gitlab.split('/').pop();
const API = 'https://gitlab.com/api/v4';
const TIMEOUT_MS = 10000;

// Unauthenticated GitLab API calls can hit short burst limits (429), especially from
// shared CI runner IPs: honour Retry-After a couple of times before giving up
async function getJson(url, retries = 2) {
    const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (response.status === 429 && retries > 0) {
        const waitSeconds = Math.min(Number(response.headers.get('retry-after')) || 2, 10);
        await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
        return getJson(url, retries - 1);
    }
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
    return response.json();
}

function readPrevious() {
    try {
        return JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    } catch {
        return {};
    }
}

async function main() {
    const repos = [...new Set([...projects, ...moreLabs].map((project) => project.repo))];
    const previous = readPrevious();
    const stats = {};
    const missing = [];

    // Sequential on purpose: a handful of requests, and gentle on rate limits
    for (const repo of repos) {
        const projectPath = encodeURIComponent(`${username}/${repo}`);
        try {
            const project = await getJson(`${API}/projects/${projectPath}`);
            const languages = await getJson(`${API}/projects/${projectPath}/languages`).catch(() => ({}));
            stats[repo] = {
                lastActivityAt: project.last_activity_at,
                stars: project.star_count,
                languages,
            };
        } catch (error) {
            // Rate limited even after retrying: the remaining repos would be too
            if (error.message.startsWith('429')) throw error;
            missing.push(`${repo} (${error.message.split(' for ')[0]})`);
        }
    }

    if (repos.length && !Object.keys(stats).length) throw new Error(missing.join(', '));

    // Repos that failed this time keep their last known stats
    repos.forEach((repo) => {
        if (!stats[repo] && previous[repo]) stats[repo] = previous[repo];
    });
    fs.writeFileSync(outputFile, JSON.stringify(stats, null, 2));
    console.log(`✅ Fetched GitLab stats for ${Object.keys(stats).length} repos${missing.length ? ` (skipped: ${missing.join(', ')})` : ''}`);
}

main().catch((error) => {
    // Keep the last good projects.json if there is one
    const kept = fs.existsSync(outputFile);
    console.warn(`⚠️  Could not fetch GitLab project stats (${error.message}); ${kept ? 'keeping the previous projects.json' : 'continuing without them'}.`);
    if (!kept) fs.writeFileSync(outputFile, '{}');
});
