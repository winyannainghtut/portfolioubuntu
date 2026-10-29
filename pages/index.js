import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Ubuntu from "../components/ubuntu";
import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";

// Inlined at build time (static export) - set via the GitHub Actions repo variable
const TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Only initialize Google Analytics if tracking ID is provided
if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
}

function App() {
  const router = useRouter();

  // The Desktop consumes deep links (?post=, ?app=) on mount; tidy the URL afterwards.
  // Must wait for router.isReady: on static pages Next re-applies the query after hydration.
  useEffect(() => {
    if (router.isReady && (router.query.post || router.query.app)) {
      router.replace("/", undefined, { shallow: true });
    }
  }, [router]);

  return (
    <>
      <Meta />
      {/* The desktop renders client-side; give crawlers and screen readers plain links */}
      <nav className="sr-only">
        <Link href="/about/">About Win Yan Naing Htut</Link>
        <Link href="/blog/">Blog</Link>
      </nav>
      <Ubuntu />
    </>
  )
}

export default App;
