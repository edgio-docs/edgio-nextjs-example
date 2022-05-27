import '@/styles/globals.css'
import { Metrics } from '@layer0/rum'
import Router from '@layer0/rum/Router'
import Navbar from '@/components/Navbar'

// Implementing Real Time User Monitoring (Core Web Vitals)
// https://docs.layer0.co/guides/core_web_vitals#npm-or-yarn
// Include the RUM Analytics in the production build only
if (process.env.NODE_ENV === 'production') {
  new Metrics({
    // Set this TOKEN as an environment variable at Layer0 Console
    // More on creating env variables: https://docs.layer0.co/guides/environments#creating-environment-variables
    token: process.env.RUM_TOKEN,
    router: new Router()
      .match('/', ({ setPageLabel }) => setPageLabel('home'))
      .match('/search', ({ setPageLabel }) => setPageLabel('search'))
      .match('/search/:id', ({ setPageLabel }) => setPageLabel('search'))
      .match('/products/:id', ({ setPageLabel }) => setPageLabel('products/:id')),
  }).collect()
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
