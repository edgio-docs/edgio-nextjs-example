import Layer0RUM from 'rum'
import '@/styles/globals.css'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { install } from '@layer0/prefetch/window'

// Include the RUM Analytics in the production build only
if (process.env.NODE_ENV === 'production') {
  Layer0RUM('8016af1c-fb31-45c1-b1e0-312bffabbe93')
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Enable service worker inside the window
    install()
  }, [])

  return (
    <div className="flex flex-col">
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
