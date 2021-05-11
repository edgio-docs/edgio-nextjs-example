import '../styles/globals.css'
import '../styles/tailwind.css'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingIndicator from '../components/LoadingIndicator'
import { prefetch } from '@layer0/prefetch/window/prefetch'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))

    // register a listener for SW messages to prefetch images from the PLP API responses
    const { serviceWorker } = navigator
    if (serviceWorker) {
      serviceWorker.addEventListener('message', event => {
        if (event.data.action === 'prefetch') {
          prefetch(event.data.url, event.data.as, event.data.options)
        }
      })
    }
  }, [])

  return (
    <>
      {loading && <LoadingIndicator />}
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
