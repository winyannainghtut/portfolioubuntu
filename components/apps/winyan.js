import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import ReactGA from 'react-ga4';
import { useAssetPath } from '../../lib/asset-path';
import {
    profile,
    links,
    gitlabRepoUrl,
    aboutCards,
    experiences,
    projects,
    moreLabs,
    certifications,
    education,
    skillCategories
} from '../../data/resume';

const navItems = [
    { id: "about", label: "About Me", icon: "./themes/Yaru/status/about.svg" },
    { id: "experience", label: "Experience", icon: "./themes/Yaru/status/experience.svg" },
    { id: "projects", label: "Projects", icon: "./themes/Yaru/status/projects.svg" },
    { id: "certifications", label: "Certifications", icon: "./themes/Yaru/status/education.svg" },
    { id: "education", label: "Education", icon: "./themes/Yaru/status/education.svg" },
    { id: "skills", label: "Skills", icon: "./themes/Yaru/status/skills.svg" },
    { id: "contact", label: "Contact", icon: "./themes/Yaru/status/contact.svg" },
    { id: "resume", label: "Resume", icon: "./themes/Yaru/status/download.svg" },
];

export class AboutWinYan extends Component {

    constructor() {
        super();
        this.screens = {
            "about": <About />,
            "experience": <Experience />,
            "projects": <Projects />,
            "certifications": <Certifications />,
            "education": <Education />,
            "skills": <Skills />,
            "contact": <Contact />,
            "resume": <Resume />,
        }
        this.state = {
            active_screen: "about",
            navbar: false,
        }
    }

    componentDidMount() {
        let lastVisitedScreen = localStorage.getItem("about-section");
        if (!this.screens[lastVisitedScreen]) {
            lastVisitedScreen = "about";
        }

        this.changeScreen(lastVisitedScreen);
    }

    changeScreen = (screen) => {
        localStorage.setItem("about-section", screen);
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });

        this.setState({ active_screen: screen });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    // Rendered twice (desktop sidebar + mobile dropdown), so items carry no DOM ids
    renderNavLinks = () => {
        return (
            <>
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        data-screen={item.id}
                        tabIndex="0"
                        onFocus={() => this.changeScreen(item.id)}
                        className={`
                            ${this.state.active_screen === item.id
                                ? "bg-ub-orange bg-opacity-100 hover:bg-opacity-95"
                                : "hover:bg-gray-50 hover:bg-opacity-5"
                            }
                            w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none
                            py-2 focus:outline-none duration-150 my-0.5 flex justify-start items-center
                            pl-2 md:pl-3 transition-all group
                        `}
                    >
                        <img
                            className="w-3.5 md:w-4 opacity-80 group-hover:opacity-100 transition-opacity"
                            alt={item.label}
                            src={item.icon}
                        />
                        <span className="ml-2 md:ml-2.5 text-gray-50 text-sm">{item.label}</span>
                    </div>
                ))}
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                {/* Desktop Navigation */}
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black/50 bg-gradient-to-b from-ub-cool-grey to-ub-grey/50">
                    <div className="p-3 border-b border-white/5">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Portfolio</span>
                    </div>
                    {this.renderNavLinks()}
                </div>

                {/* Mobile Navigation Toggle */}
                <div
                    onClick={this.showNavBar}
                    className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey/90 backdrop-blur-sm rounded-lg w-8 h-8 top-2 left-2 z-20 cursor-pointer hover:bg-ub-orange/20 transition-colors"
                >
                    <div className="w-4 border-t border-white"></div>
                    <div className="w-4 border-t border-white my-1"></div>
                    <div className="w-4 border-t border-white"></div>
                    <div className={`
                        ${this.state.navbar ? "visible animateShow" : "invisible"}
                        md:hidden text-xs absolute bg-ub-cool-grey/95 backdrop-blur-md py-1 px-1 rounded-lg
                        top-full mt-2 left-0 shadow-xl border border-white/10 z-30
                    `}>
                        {this.renderNavLinks()}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    <div className="w-full h-full">
                        {this.screens[this.state.active_screen]}
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutWinYan;

export const displayAboutWinYan = () => {
    return <AboutWinYan />;
}

// ============================================
// Shared icons
// ============================================
const icons = {
    linkedin: (className) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    ),
    gitlab: (className) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="m23.6 9.593-.033-.086L20.3.98a.851.851 0 0 0-.336-.405.879.879 0 0 0-1.002.07.866.866 0 0 0-.285.386l-2.212 6.779H7.535L5.323 1.031a.857.857 0 0 0-.286-.386.878.878 0 0 0-1.002-.07.856.856 0 0 0-.337.406L.433 9.502l-.032.086a6.066 6.066 0 0 0 2.012 7.01l.012.009.031.023 4.994 3.745 2.47 1.871 1.503 1.137a1.009 1.009 0 0 0 1.219 0l1.503-1.137 2.47-1.871 5.026-3.768.014-.011a6.072 6.072 0 0 0 2.011-7.003Z"/></svg>
    ),
    github: (className) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    ),
    email: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    globe: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
    ),
    external: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
    ),
};

// ============================================
// About Section
// ============================================
export function About({ simpleViewLink = true }) {
    const asset = useAssetPath();

    return (
        <div className="flex flex-col items-center px-4 py-6 md:py-8">
            {/* Avatar with animated ring */}
            <div className="avatar-ring mb-4">
                <div className="w-24 md:w-32 bg-white rounded-full overflow-hidden">
                    <img className="w-full" src={asset("images/logos/bitmoji.png")} alt={profile.name} />
                </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {profile.name}
                </h1>
                <p className="text-lg md:text-xl text-gray-300">
                    <span className="gradient-text font-bold">{profile.title}</span>
                </p>
            </div>

            {/* Divider */}
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-ub-orange to-transparent mb-6"></div>

            {/* Bio Cards */}
            <div className="w-full max-w-2xl space-y-4 px-2">
                {aboutCards.map((card, index) => (
                    <div key={index} className="glass-card p-4 hover-lift">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{card.icon}</span>
                            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                                {card.segments.map((segment, i) => (
                                    <span
                                        key={i}
                                        className={segment.strong ? "font-semibold text-white" : segment.highlight ? "text-ubt-gedit-orange font-medium" : undefined}
                                    >
                                        {segment.text}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {icons.linkedin("w-4 h-4 mr-2")}
                    LinkedIn
                </a>
                <a href={links.gitlab} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    {icons.gitlab("w-4 h-4 mr-2")}
                    GitLab
                </a>
                <a href={`mailto:${links.email}`} className="btn-secondary">
                    {icons.email("w-4 h-4 mr-2")}
                    Email
                </a>
            </div>

            {simpleViewLink && (
                <p className="mt-6 text-xs text-gray-500">
                    Prefer a plain page?{" "}
                    <Link href="/about/" className="text-ub-orange hover:underline">View the simple version</Link>
                </p>
            )}
        </div>
    );
}

// ============================================
// Experience Section
// ============================================
export function Experience() {
    return (
        <div className="px-4 md:px-8 py-6">
            <h2 className="section-header text-2xl md:text-3xl text-center mb-8">Work Experience</h2>

            <div className="max-w-3xl mx-auto space-y-6">
                {experiences.map((exp) => (
                    <div key={exp.id} className="timeline-item pl-6 pb-6">
                        <div className="glass-card p-4 md:p-5">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                                        {exp.title}
                                        {exp.current && (
                                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-ubt-gedit-orange font-medium text-sm md:text-base">
                                        {exp.company} • {exp.location}
                                    </p>
                                </div>
                                <span className="text-xs md:text-sm text-gray-400 bg-white/5 px-2 py-1 rounded">
                                    {exp.period}
                                </span>
                            </div>
                            <ul className="space-y-1.5">
                                {exp.highlights.map((item, i) => (
                                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                        <span className="text-ub-orange mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Projects Section
// ============================================

// Summarises GitLab stats generated at build time (scripts/fetch-gitlab-projects.js)
function repoMeta(stats) {
    if (!stats) return null;
    const parts = [];
    if (stats.lastActivityAt) {
        const updated = new Date(stats.lastActivityAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        parts.push(`Updated ${updated}`);
    }
    const languages = Object.entries(stats.languages || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, percent]) => `${name} ${Math.round(percent)}%`);
    return parts.concat(languages).join(' · ') || null;
}

export function Projects() {
    const asset = useAssetPath();
    const statsUrl = asset("projects.json");
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch(statsUrl)
            .then((response) => (response.ok ? response.json() : {}))
            .then(setStats)
            .catch(() => setStats({}));
    }, [statsUrl]);

    return (
        <div className="px-4 md:px-8 py-6">
            <h2 className="section-header text-2xl md:text-3xl text-center mb-8">Projects</h2>

            <div className="max-w-3xl mx-auto space-y-4">
                <div className="text-center mb-6">
                    <p className="text-gray-300">
                        Selected technical projects from my{" "}
                        <span className="gradient-text font-semibold">personal labs & PoCs</span>
                    </p>
                </div>

                {projects.map((project) => {
                    const meta = repoMeta(stats[project.repo]);
                    return (
                        <div key={project.repo} className="glass-card p-4 md:p-5 hover-lift">
                            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed mb-3">{project.description}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <a
                                    href={gitlabRepoUrl(project.repo)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                                >
                                    Repo: {project.repo}
                                    {icons.external("w-3 h-3")}
                                </a>
                                {meta && <span className="text-xs text-gray-500">{meta}</span>}
                            </div>
                        </div>
                    );
                })}

                <div className="glass-card p-4 md:p-5">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">More labs</h3>
                    <div className="flex flex-wrap gap-2">
                        {moreLabs.map((lab) => (
                            <a
                                key={lab.repo}
                                href={gitlabRepoUrl(lab.repo)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="skill-badge"
                            >
                                {lab.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Certifications Section
// ============================================
export function Certifications() {
    return (
        <div className="px-4 md:px-8 py-6">
            <h2 className="section-header text-2xl md:text-3xl text-center mb-8">Certifications</h2>

            <div className="max-w-3xl mx-auto grid gap-4">
                {certifications.map((cert) => (
                    <div key={cert.id} className={`cert-card ${cert.featured ? 'featured' : ''}`}>
                        <div className="flex items-start justify-between gap-3">
                            {cert.badge ? (
                                <img
                                    className="w-14 h-14 object-contain flex-shrink-0"
                                    src={cert.badge}
                                    alt={`${cert.title} badge`}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-2xl" aria-hidden="true">
                                    🎖️
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold text-white text-base md:text-lg">{cert.title}</h3>
                                {cert.subtitle && (
                                    <p className="text-sm text-gray-400">{cert.subtitle}</p>
                                )}
                                <p className="text-sm text-gray-300 mt-1">{cert.org}</p>
                                {cert.tag && (
                                    <span className="inline-block mt-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                                        {cert.tag}
                                    </span>
                                )}
                            </div>
                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                                >
                                    Verify
                                    {icons.external("w-3 h-3")}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Education Section
// ============================================
export function Education() {
    return (
        <div className="px-4 md:px-8 py-6">
            <h2 className="section-header text-2xl md:text-3xl text-center mb-8">Education</h2>

            <div className="max-w-2xl mx-auto space-y-4">
                {education.map((degree) => (
                    <div key={degree.id} className="glass-card p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-ub-orange/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-ub-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                    {degree.title}
                                </h3>
                                <p className="text-gray-300">{degree.school}</p>
                                <p className="text-sm text-gray-400 mt-1">{degree.period}</p>
                                {degree.tag && (
                                    <span className="inline-block mt-2 text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                                        {degree.tag}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// Contact Section
// ============================================
export function Contact() {
    const contacts = [
        { label: "Email", value: links.email, href: `mailto:${links.email}`, icon: icons.email },
        { label: "LinkedIn", value: "linkedin.com/in/wynh", href: links.linkedin, external: true, icon: icons.linkedin },
        { label: "GitHub", value: "github.com/winyannainghtut", href: links.github, external: true, icon: icons.github },
        { label: "GitLab", value: "gitlab.com/winyannainghtut", href: links.gitlab, external: true, icon: icons.gitlab },
        { label: "Portfolio", value: "portfolio.winyan.dev", href: links.portfolio, external: true, icon: icons.globe },
    ];

    return (
        <div className="px-4 md:px-8 py-6">
            <h2 className="section-header text-2xl md:text-3xl text-center mb-8">Get In Touch</h2>

            <div className="max-w-xl mx-auto space-y-3">
                {contacts.map((contact) => (
                    <a
                        key={contact.label}
                        href={contact.href}
                        target={contact.external ? "_blank" : undefined}
                        rel={contact.external ? "noopener noreferrer" : undefined}
                        className="glass-card p-4 flex items-center gap-4 hover-lift group cursor-pointer block"
                    >
                        <div className="w-10 h-10 rounded-full bg-ub-orange/20 flex items-center justify-center text-ub-orange group-hover:bg-ub-orange group-hover:text-white transition-colors">
                            {contact.icon("w-5 h-5")}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wider">{contact.label}</p>
                            <p className="text-white group-hover:text-ub-orange transition-colors">{contact.value}</p>
                        </div>
                        {contact.external && icons.external("w-4 h-4 text-gray-500 group-hover:text-ub-orange transition-colors")}
                    </a>
                ))}
            </div>

            <div className="max-w-xl mx-auto mt-8 text-center">
                <p className="text-sm text-gray-400">
                    I'm always open to discussing new opportunities, cloud architecture projects, or collaboration on DevOps initiatives. Feel free to reach out!
                </p>
            </div>
        </div>
    );
}

// ============================================
// Skills Section
// ============================================
export function Skills() {
    return (
        <div className="px-4 md:px-8 py-6">
            <h2 className="section-header text-2xl md:text-3xl text-center mb-8">Technical Skills</h2>

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Intro */}
                <div className="text-center mb-8">
                    <p className="text-gray-300">
                        My areas of expertise are{" "}
                        <span className="gradient-text font-semibold">
                            AWS Infrastructure, IaC & CI/CD, Platform Engineering & Network Engineering
                        </span>
                    </p>
                </div>

                {/* Skill Categories */}
                {skillCategories.map((category) => (
                    <div key={category.id} className="glass-card p-5">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span>{category.icon}</span>
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span key={skill} className="skill-badge">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Certification highlight */}
                <div className="text-center mt-8 p-4 bg-gradient-to-r from-ub-orange/10 via-ub-orange/20 to-ub-orange/10 rounded-lg border border-ub-orange/30">
                    <p className="text-gray-300">
                        <span className="font-semibold text-white">CNCF Kubestronaut</span>
                        {" "}(all 5 Kubernetes certifications),{" "}
                        <span className="font-semibold text-white">AWS DevOps Engineer – Professional</span>
                        {" "}and{" "}
                        <span className="font-semibold text-white">AWS Solutions Architect – Associate</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Resume Section
// ============================================
export function Resume() {
    const asset = useAssetPath();

    return (
        <iframe
            className="h-full w-full"
            src={asset(links.resume)}
            title={`${profile.name} Resume`}
            frameBorder="0"
        />
    );
}
