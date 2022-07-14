import Layer0RUM from 'rum'
import '@/styles/globals.css'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { install } from '@layer0/prefetch/window'
import installDevtools from '@layer0/devtools/install'

// Include the RUM Analytics in the production build only
if (process.env.NODE_ENV === 'production') {
  Layer0RUM('f3b82d21-7df8-46e4-8475-5f30ed585341')
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Enable service worker inside the window
    install()
    // Enable devtools manually, instead of relying on defaults by Layer0
    installDevtools()
  }, [])

  return (
    <div className="flex flex-col bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D] min-h-screen">
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
