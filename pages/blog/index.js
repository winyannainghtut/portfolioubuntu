import React from 'react';
import Link from 'next/link';
import SiteLayout from '../../components/site/SiteLayout';
import PageMeta from '../../components/SEO/PageMeta';
import { getAllPosts } from '../../lib/blog';
import { formatPostDate } from '../../lib/format';
import { profile } from '../../data/resume';

export default function BlogIndex({ posts }) {
    return (
        <SiteLayout>
            <PageMeta
                title={`Blog - ${profile.name}`}
                description="Thoughts, tutorials, and insights on Cloud, DevOps, and Technology."
                path="/blog/"
            />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
                <p className="text-gray-400 mb-8">Thoughts, tutorials, and insights on Cloud, DevOps, and Technology</p>

                {posts.length === 0 && <p className="text-gray-400">No posts yet — check back soon!</p>}

                <div className="space-y-4">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}/`} className="glass-card p-5 block hover-lift group">
                            <h2 className="text-xl font-semibold group-hover:text-ub-orange transition-colors mb-1">{post.title}</h2>
                            <p className="text-sm text-gray-400 mb-2">{formatPostDate(post.date)} · {post.readingTime} min read</p>
                            <p className="text-gray-300 text-sm">{post.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </SiteLayout>
    );
}

export function getStaticProps() {
    // The list doesn't need full post bodies
    const posts = getAllPosts().map(({ content, ...post }) => post);
    return { props: { posts } };
}
