import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary fallbackMessage="The application encountered an error. Please refresh the page.">
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default MyApp
