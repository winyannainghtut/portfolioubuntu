import React from 'react';
import Link from 'next/link';
import SiteLayout from '../../components/site/SiteLayout';
import PageMeta from '../../components/SEO/PageMeta';
import PostContent from '../../components/blog/PostContent';
import { getAllPosts, getPostBySlug } from '../../lib/blog';
import { formatPostDate } from '../../lib/format';
import { SITE_URL } from '../../lib/site';
import { profile } from '../../data/resume';

export default function BlogPost({ post }) {
    const publishedTime = post.date ? new Date(post.date).toISOString() : undefined;

    return (
        <SiteLayout>
            <PageMeta
                title={`${post.title} - ${profile.name}`}
                description={post.excerpt}
                path={`/blog/${post.slug}/`}
                type="article"
                publishedTime={publishedTime}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post.title,
                    description: post.excerpt,
                    datePublished: publishedTime,
                    url: `${SITE_URL}/blog/${post.slug}/`,
                    author: { "@type": "Person", name: profile.name, url: `${SITE_URL}/about/` },
                }}
            />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Link href="/blog/" className="text-sm text-ub-orange hover:text-orange-300">← All posts</Link>

                <header className="mt-6 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
                    <p className="text-sm text-gray-400">
                        {formatPostDate(post.date)} · {post.readingTime} min read ·{" "}
                        <Link href={`/?post=${post.slug}`} className="hover:text-ub-orange">Open in the Ubuntu desktop</Link>
                    </p>
                </header>

                <PostContent content={post.content} />
            </div>
        </SiteLayout>
    );
}

export function getStaticPaths() {
    return {
        paths: getAllPosts().map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}

export function getStaticProps({ params }) {
    return { props: { post: getPostBySlug(params.slug) } };
}
