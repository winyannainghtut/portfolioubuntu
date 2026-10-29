import React from 'react'
import Head from 'next/head';
import { SITE_URL } from '../../lib/site';

export default function Meta() {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>Win Yan Naing Htut - Cloud & DevOps Engineer | Kubestronaut Portfolio</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Win Yan Naing Htut - Cloud & DevOps Engineer | Kubestronaut" />
            <meta name="description"
                content="Win Yan Naing Htut's Portfolio - Cloud & DevOps Engineer and CNCF Kubestronaut with 9+ years of IT experience. AWS infrastructure in Singapore GCC/GCC+ environments, Terraform, GitLab CI/CD, IAM/OIDC and cloud security. Currently at NCS PTE Ltd, Singapore. Made with Ubuntu 20.4 theme by Next.js and Tailwind CSS." />
            <meta name="author" content="Win Yan Naing Htut" />
            <meta name="keywords"
                content="Win Yan Naing Htut, Cloud Engineer, DevOps Engineer, Platform Automation, Kubestronaut, AWS DevOps Engineer Professional, Kubernetes, AWS, GCC, Terraform, GitLab CI/CD, Ansible, HashiCorp Vault, Network Engineer, Singapore, NCS PTE Ltd, ubuntu portfolio" />
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
            <meta itemProp="name" content="Win Yan Naing Htut - Cloud & DevOps Engineer | Kubestronaut" />
            <meta itemProp="description"
                content="Win Yan Naing Htut's Portfolio - Cloud & DevOps Engineer and CNCF Kubestronaut with 9+ years of IT experience. AWS infrastructure in Singapore GCC/GCC+ environments, Terraform, GitLab CI/CD, IAM/OIDC and cloud security. Currently at NCS PTE Ltd, Singapore." />
            <meta itemProp="image" content={`${SITE_URL}/images/logos/fevicon.png`} />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Win Yan Naing Htut - Cloud & DevOps Engineer | Kubestronaut" />
            <meta name="twitter:description"
                content="Cloud & DevOps Engineer and CNCF Kubestronaut at NCS PTE Ltd, Singapore. AWS, Terraform, GitLab CI/CD, Kubernetes and platform automation." />
            <meta name="twitter:site" content="@WinYanNaingHtut" />
            <meta name="twitter:creator" content="@WinYanNaingHtut" />
            <meta name="twitter:image" content={`${SITE_URL}/images/logos/logo_1024.png`} />
            <meta name="twitter:image:alt" content="Win Yan Naing Htut Portfolio" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={SITE_URL} />
            <meta property="og:title" content="Win Yan Naing Htut - Cloud & DevOps Engineer | Kubestronaut Portfolio" />
            <meta property="og:description"
                content="Cloud & DevOps Engineer and CNCF Kubestronaut with 9+ years of IT experience in AWS, Terraform, GitLab CI/CD and Kubernetes. Currently at NCS PTE Ltd, Singapore. Made with Ubuntu 20.4 theme." />
            <meta property="og:image" content={`${SITE_URL}/images/logos/logo_1200.png`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Win Yan Naing Htut - Cloud & DevOps Engineer Portfolio" />
            <meta property="og:site_name" content="Win Yan Naing Htut Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Favicon, RSS and fonts are site-wide: see pages/_document.js */}
        </Head>
    )
}
