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
  return (
    <>
      <Meta />
      <Ubuntu />
    </>
  )
}

export default App;
