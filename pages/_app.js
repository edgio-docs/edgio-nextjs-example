import Layer0RUM from 'rum'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

// Include the RUM Analytics in the production build only
if (process.env.NODE_ENV === 'production') {
  Layer0RUM(process.env.RUM_TOKEN)
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
