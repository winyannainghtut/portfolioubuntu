// Virtual home directory (/home/winyan) shared by the Terminal and Files apps, built from résumé data.
// Node types: 'dir' (children), 'file' (text content, optional url) and 'link' (opens a url).
import {
    profile,
    links,
    gitlabRepoUrl,
    experiences,
    projects,
    moreLabs,
    certifications,
    education,
    skillCategories,
    resumeToText
} from './resume';

export const HOME_PATH = `/home/${profile.username}`;

const dir = (name, children, extra = {}) => ({ name, type: 'dir', children, ...extra });
const file = (name, content, extra = {}) => ({ name, type: 'file', content, ...extra });
const link = (name, url, description) => ({ name, type: 'link', url, description });

export const homeDirectory = dir('~', [
    dir('projects', [
        ...projects.map((p) => link(p.repo, gitlabRepoUrl(p.repo), `${p.title}: ${p.description}`)),
        ...moreLabs.map((l) => link(l.repo, gitlabRepoUrl(l.repo), l.title)),
    ]),
    dir('experience', experiences.map((exp) => file(
        `${exp.id}.txt`,
        `${exp.title} — ${exp.company}\n${exp.location} · ${exp.period}\n\n${exp.highlights.map((h) => `• ${h}`).join('\n')}`
    ))),
    dir('skills', skillCategories.map((category) => file(
        `${category.id}.txt`,
        `${category.title}\n\n${category.skills.join(', ')}`
    ))),
    dir('certifications', certifications.map((cert) => file(
        `${cert.id}.txt`,
        [cert.title, cert.subtitle, cert.org, cert.link && `Verify: ${cert.link}`].filter(Boolean).join('\n'),
        { url: cert.link }
    ))),
    dir('education', education.map((degree) => file(
        `${degree.id}.txt`,
        [degree.title, degree.school, degree.period, degree.tag].filter(Boolean).join('\n')
    ))),
    file('resume.txt', resumeToText()),
    link('resume.pdf', links.resume, 'Résumé (PDF)'),
    dir('personal-documents', [], { locked: true }),
]);

/** Node at a list of path segments below home, or null. */
export function nodeAt(parts) {
    let node = homeDirectory;
    for (const part of parts) {
        node = node.type === 'dir' ? node.children.find((child) => child.name === part) : null;
        if (!node) return null;
    }
    return node;
}

/**
 * Resolves a shell-style path (relative, `..`, `~`, `~/x` or `/home/winyan/x`) against `cwd`
 * (an array of segments below home). Returns { parts, node } or null if it doesn't exist.
 * `..` stops at home: the rest of the "filesystem" is off-limits.
 */
export function resolvePath(cwd, input = '') {
    let path = input.trim();
    let parts = [...cwd];

    if (path === '' || path === '~') return { parts: [], node: homeDirectory };
    if (path.startsWith('~/')) {
        parts = [];
        path = path.slice(2);
    } else if (path === HOME_PATH || path.startsWith(`${HOME_PATH}/`)) {
        parts = [];
        path = path.slice(HOME_PATH.length);
    } else if (path.startsWith('/')) {
        return null;
    }

    for (const segment of path.split('/').filter(Boolean)) {
        if (segment === '.') continue;
        if (segment === '..') {
            parts.pop();
            continue;
        }
        const current = nodeAt(parts);
        if (!current || current.type !== 'dir' || current.locked) return null;
        if (!current.children.some((child) => child.name === segment)) return null;
        parts.push(segment);
    }
    return { parts, node: nodeAt(parts) };
}

/** "~/projects" style path for prompts and title bars. */
export function displayPath(parts) {
    return ['~', ...parts].join('/');
}
