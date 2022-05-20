import { useEffect } from 'react'
import { prefetch } from '@layer0/prefetch/window/prefetch'

const Home = ({}) => {
  // Prefetch grey image using Layer0 for instant placeholder loads on the PLP page
  useEffect(() => {
    prefetch('/images/grey.png')
  }, [])
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 md:px-0">
      <div className="flex w-full flex-row flex-wrap md:w-2/3">
        <div className="mt-10 flex w-full flex-col items-start justify-start rounded p-5 md:w-1/2">
          <h1 className="text-xl font-bold">Next.js with Layer0</h1>
          <h3 className="mt-2 text-lg">Layer0 supports all of the most powerful features of Next.js!</h3>
          <a className="mt-auto text-blue-600 hover:underline" href="https://docs.layer0.co/guides/next" target="_blank">
            Learn More &rarr;
          </a>
        </div>
        <div className="mt-10 flex w-full flex-col items-start justify-start rounded p-5 md:w-1/2">
          <h1 className="text-xl font-bold">Next.js Commerce with Layer0</h1>
          <h3 className="mt-2 mb-5 text-lg">
            It uses all of the latest Next.js features including image optimization, localization, and incremental static regeneration with
            stale-while-revalidate.
          </h3>
          <a className="mt-auto text-blue-600 hover:underline" href="https://docs.layer0.co/guides/next_commerce" target="_blank">
            Learn More &rarr;
          </a>
        </div>
        <div className="mt-10 flex w-full flex-col items-start justify-start rounded p-5 md:w-1/2">
          <h1 className="text-xl font-bold">Caching with Layer0</h1>
          <h3 className="mt-2 mb-5 text-lg">
            While most CDNs only cache content on your asset URLs, Layer0 caches content on your page URLs using EdgeJS, allowing you to control
            caching within your application code.
          </h3>
          <a className="mt-auto text-blue-600 hover:underline" href="https://docs.layer0.co/guides/caching" target="_blank">
            Learn More &rarr;
          </a>
        </div>
        <div className="mt-10 flex w-full flex-col items-start justify-start rounded p-5 md:w-1/2">
          <h1 className="text-xl font-bold">Layer0 Prefetching</h1>
          <h3 className="mt-2 text-lg">
            {`Layer0 allows you to speed up the user’s browsing experience by prefetching pages and API calls that they are likely to need.`}
          </h3>
          <a className="mt-auto text-blue-600 hover:underline" href="https://docs.layer0.co/guides/prefetching" target="_blank">
            Learn More &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
