import Head from 'next/head'
import '@/styles/globals.css'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { prefetch } from '@layer0/prefetch/window/prefetch'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState('print')
  useEffect(() => {
    setMounted('all')
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
      <Head>
        <link
          media={mounted}
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
