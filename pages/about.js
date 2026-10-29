import React from 'react';
import SiteLayout from '../components/site/SiteLayout';
import PageMeta from '../components/SEO/PageMeta';
import { About, Experience, Projects, Certifications, Education, Skills, Contact } from '../components/apps/winyan';
import { SITE_URL } from '../lib/site';
import { profile, links, experiences, education } from '../data/resume';

// The "simple version": the same sections as the desktop About app on one scrollable,
// pre-rendered page - easy to read on a phone and fully visible to search engines.
const sections = [
    { id: "experience", label: "Experience", Component: Experience },
    { id: "projects", label: "Projects", Component: Projects },
    { id: "certifications", label: "Certifications", Component: Certifications },
    { id: "education", label: "Education", Component: Education },
    { id: "skills", label: "Skills", Component: Skills },
    { id: "contact", label: "Contact", Component: Contact },
];

export default function AboutPage() {
    const current = experiences.find((exp) => exp.current);

    return (
        <SiteLayout>
            <PageMeta
                title={`${profile.name} - ${profile.shortTitle}`}
                description={profile.summary}
                path="/about/"
                type="profile"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Person",
                    name: profile.name,
                    jobTitle: profile.shortTitle,
                    url: `${SITE_URL}/about/`,
                    email: `mailto:${links.email}`,
                    address: { "@type": "PostalAddress", addressLocality: profile.location },
                    worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
                    alumniOf: education.map((degree) => ({ "@type": "CollegeOrUniversity", name: degree.school })),
                    sameAs: [links.linkedin, links.gitlab, links.github],
                }}
            />

            <About simpleViewLink={false} />

            <nav className="sticky top-0 md:top-14 z-[5] bg-ub-grey/90 backdrop-blur-sm border-y border-white/5">
                <div className="max-w-4xl mx-auto px-4 py-2 flex gap-4 overflow-x-auto text-sm text-gray-400">
                    {sections.map((section) => (
                        <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap hover:text-ub-orange">{section.label}</a>
                    ))}
                </div>
            </nav>

            {sections.map(({ id, Component }) => (
                <section key={id} id={id} className="scroll-mt-12 md:scroll-mt-28 border-b border-white/5 last:border-0">
                    <Component />
                </section>
            ))}
        </SiteLayout>
    );
}
