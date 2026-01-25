import React from 'react'
import Head from 'next/head';

const SITE_URL = 'https://portfolio.winyan.dev';

export default function Meta() {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>Win Yan Naing Htut - Cloud Engineer & Kubestronaut Portfolio</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Win Yan Naing Htut - Cloud Engineer & Kubestronaut" />
            <meta name="description"
                content="Win Yan Naing Htut's Portfolio - Cloud Engineer & CNCF Kubestronaut with expertise in Kubernetes, AWS, Terraform, and DevOps. Currently working at NCS PTE Ltd, Singapore. Made with Ubuntu 20.4 theme by Next.js and Tailwind CSS." />
            <meta name="author" content="Win Yan Naing Htut" />
            <meta name="keywords"
                content="Win Yan Naing Htut, Cloud Engineer, Kubestronaut, Kubernetes, AWS, Terraform, DevOps, Network Engineer, Singapore, NCS PTE Ltd, ubuntu portfolio, cloud architect, DevOps engineer" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={SITE_URL} />

            {/* Search Engine */}
            <meta name="image" content={`${SITE_URL}/images/logos/fevicon.png`} />
            
            {/* Schema.org for Google */}
            <meta itemProp="name" content="Win Yan Naing Htut - Cloud Engineer & Kubestronaut" />
            <meta itemProp="description"
                content="Win Yan Naing Htut's Portfolio - Cloud Engineer & CNCF Kubestronaut with expertise in Kubernetes, AWS, Terraform, and DevOps. Currently working at NCS PTE Ltd, Singapore." />
            <meta itemProp="image" content={`${SITE_URL}/images/logos/fevicon.png`} />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Win Yan Naing Htut - Cloud Engineer & Kubestronaut" />
            <meta name="twitter:description"
                content="Cloud Engineer & CNCF Kubestronaut working at NCS PTE Ltd, Singapore. Expert in Kubernetes, AWS, Terraform, and DevOps." />
            <meta name="twitter:site" content="@WinYanNaingHtut" />
            <meta name="twitter:creator" content="@WinYanNaingHtut" />
            <meta name="twitter:image" content={`${SITE_URL}/images/logos/logo_1024.png`} />
            <meta name="twitter:image:alt" content="Win Yan Naing Htut Portfolio" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={SITE_URL} />
            <meta property="og:title" content="Win Yan Naing Htut - Cloud Engineer & Kubestronaut Portfolio" />
            <meta property="og:description"
                content="Cloud Engineer & CNCF Kubestronaut with expertise in Kubernetes, AWS, Terraform, and DevOps. Currently working at NCS PTE Ltd, Singapore. Made with Ubuntu 20.4 theme." />
            <meta property="og:image" content={`${SITE_URL}/images/logos/logo_1200.png`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Win Yan Naing Htut - Cloud Engineer Portfolio" />
            <meta property="og:site_name" content="Win Yan Naing Htut Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Favicon and Icons */}
            <link rel="icon" href="/images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="/images/logos/logo.png" />
            
            {/* Preconnect for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://img.shields.io" />
            
            {/* Google Fonts with font-display swap */}
            <link 
                href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" 
                rel="stylesheet"
            />
        </Head>
    )
}
