import Layer0RUM from 'rum'
import '@/styles/globals.css'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { relativizeURL } from '@/components/Shimmer'
import { prefetch } from '@layer0/prefetch/window/prefetch'

// Include the RUM Analytics in the production build only
if (process.env.NODE_ENV === 'production') {
  Layer0RUM('8016af1c-fb31-45c1-b1e0-312bffabbe93')
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Register a listener for SW messages to prefetch images
    const { serviceWorker } = navigator
    if (serviceWorker) {
      serviceWorker.addEventListener('message', (event) => {
        if (event.data.action === 'prefetch') {
          prefetch(relativizeURL(event.data.url), event.data.as, event.data.options)
        }
      })
    }
  }, [])

  return (
    <div className="flex flex-col">
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
