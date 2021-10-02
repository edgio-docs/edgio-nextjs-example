import '@/styles/globals.css'
import Header from '@/components/Header'
import { useEffect } from 'react'
import { prefetch } from '@layer0/prefetch/window/prefetch'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // register a listener for SW messages to prefetch images from the PLP API responses
    const { serviceWorker } = navigator
    if (serviceWorker) {
      serviceWorker.addEventListener('message', (event) => {
        if (event.data.action === 'prefetch') {
          prefetch(event.data.url, event.data.as, event.data.options)
        }
      })
    }
  }, [])

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
