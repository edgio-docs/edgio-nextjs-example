import Layer0RUM from 'rum'
import '@/styles/globals.css'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { prefetch } from '@layer0/prefetch/window/prefetch'

// Include the RUM Analytics in the production build only
if (process.env.NODE_ENV === 'production') {
  Layer0RUM(process.env.RUM_TOKEN)
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Register a listener for SW messages to prefetch images
    const { serviceWorker } = navigator
    if (serviceWorker) {
      serviceWorker.addEventListener('message', (event) => {
        if (event.data.action === 'prefetch') {
          console.log(event.data)
          prefetch(event.data.url, event.data.as, event.data.options)
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
