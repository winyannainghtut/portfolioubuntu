import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
           /* Primary Meta Tags */
            <title>WinYan Portfolio</title>
            <meta charSet="utf-8" />
            <meta name="title" content="WinYan Portfolio" />
            <meta name="description"
                content="WinYan's (winyan) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="author" content="WinYan (winyan)" />
            <meta name="keywords"
                content="winyan, winyan's portfolio, winyan linux, ubuntu portfolio, WinYan protfolio,WinYan computer, WinYan, winyan ubuntu, WinYan ubuntu portfolio" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            /* Search Engine */
            <meta name="image" content="images/logos/fevicon.png" />
            /* Schema.org for Google */
            <meta itemProp="name" content="WinYan Portfolio" />
            <meta itemProp="description"
                content="WinYan's (winyan) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta itemProp="image" content="images/logos/fevicon.png" />
            /* Twitter */
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="WinYan Portfolio" />
            <meta name="twitter:description"
                content="WinYan's (winyan) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="twitter:site" content="winyan" />
            <meta name="twitter:creator" content="winyan" />
            <meta name="twitter:image:src" content="images/logos/logo_1024.png" />
            /* Open Graph general (Facebook, Pinterest & Google+) */
            <meta name="og:title" content="Win Yan Naing Htut Portfolio - Network Engineer & Cloud Specialist" />
            <meta name="og:description"
                content="Win Yan Naing Htut's Personal Portfolio Website. Network Engineer & Cloud Specialist with expertise in Kubernetes, AWS, and DevOps. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="og:image" content="images/logos/logo_1200.png" />
            <meta name="og:url" content="https://portfolio.winyan.dev/" />
            <meta name="og:site_name" content="Win Yan Naing Htut Portfolio" />
            <meta name="og:locale" content="en_US" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="images/logos/logo.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
