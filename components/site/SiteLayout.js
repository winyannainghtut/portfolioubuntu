import React from 'react';
import Link from 'next/link';
import { useAssetPath } from '../../lib/asset-path';
import { profile, links } from '../../data/resume';

/**
 * Plain, scrollable layout for the non-desktop pages (/about/, /blog/...):
 * readable on phones and crawlable by search engines.
 */
export default function SiteLayout({ children }) {
    const asset = useAssetPath();

    return (
        <div className="min-h-screen bg-ub-grey text-white flex flex-col">
            <header className="border-b border-white/10 bg-ub-cool-grey/60 backdrop-blur-sm md:sticky md:top-0 z-10">
                <nav className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                    <Link href="/about/" className="flex items-center gap-2 font-semibold hover:text-ub-orange transition-colors">
                        <img src={asset("images/logos/bitmoji.png")} alt="" className="w-8 h-8 rounded-full bg-white" />
                        {profile.name}
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                        <Link href="/about/" className="hover:text-white">About</Link>
                        <Link href="/blog/" className="hover:text-white">Blog</Link>
                        <a href={asset(links.resume)} target="_blank" rel="noopener noreferrer" className="hover:text-white">Resume</a>
                        <Link href="/" className="btn-primary !py-1 !px-3 text-xs">Open desktop</Link>
                    </div>
                </nav>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
                <p>
                    © {profile.name} ·{" "}
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ub-orange">LinkedIn</a> ·{" "}
                    <a href={links.gitlab} target="_blank" rel="noopener noreferrer" className="hover:text-ub-orange">GitLab</a> ·{" "}
                    <a href={asset("rss.xml")} className="hover:text-ub-orange">RSS</a>
                </p>
            </footer>
        </div>
    );
}
