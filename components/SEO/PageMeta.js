import React from 'react';
import Head from 'next/head';
import { SITE_URL, SITE_NAME } from '../../lib/site';

/**
 * Head tags for standalone pages (/about/, /blog/, /blog/<slug>/).
 * The desktop home page keeps its own richer tags in Meta.js.
 */
export default function PageMeta({ title, description, path, type = "website", publishedTime, jsonLd }) {
    const url = `${SITE_URL}${path}`;
    const image = `${SITE_URL}/images/logos/logo_1200.png`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />
            <link rel="canonical" href={url} />

            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {jsonLd && (
                <script
                    type="application/ld+json"
                    // Static JSON built from our own data, not user input
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
        </Head>
    );
}
