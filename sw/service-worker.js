import { Prefetcher } from '@layer0/prefetch/sw'
import { precacheAndRoute } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'
import DeepFetchPlugin from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      // Query the PDP API response for images to prefetch
      // Prefetch login is handled in pages/_app.js
      {
        jsonQuery: 'pageProps.data.images.url',
        maxMatches: 6,
        as: 'image',
      },
    ]),
  ],
})
  .route()
  // Cache the images coming from https://opt.moovweb.net
  // Read more on caching cross-origin requests at
  // https://docs.layer0.co/docs/api/prefetch/classes/_sw_prefetcher_.prefetcher.html#cache
  .cache(/^https:\/\/(.*?)\.link\/.*/)
