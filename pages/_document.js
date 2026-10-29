import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Favicon and Icons */}
                    <link rel="icon" href="/images/logos/fevicon.svg" />
                    <link rel="apple-touch-icon" href="/images/logos/logo.png" />
                    <link rel="alternate" type="application/rss+xml" title="Win Yan Naing Htut - Blog" href="/rss.xml" />

                    {/* Google Fonts with font-display swap (in _document so every page gets them) */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
