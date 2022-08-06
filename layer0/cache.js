export const API_CACHE_HANDLER = ({ cache, proxy }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60,
      // Cache responses even if they contain cache-control: private header
      // https://docs.layer0.co/guides/caching#private
      // https://docs.layer0.co/docs/api/core/interfaces/_router_cacheoptions_.edgecacheoptions.html#forceprivatecaching
      forcePrivateCaching: true,
    },
    browser: {
      // Don't save the response in the browser
      maxAgeSeconds: 0,
      // Save the response in the browser via Layer0 service worker
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
  proxy('api', { path: ':path*' })
}

export const IMAGE_CACHE_HANDLER = ({ cache, proxy }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60,
      // Cache responses even if they contain cache-control: private header
      // https://docs.layer0.co/guides/caching#private
      // https://docs.layer0.co/docs/api/core/interfaces/_router_cacheoptions_.edgecacheoptions.html#forceprivatecaching
      forcePrivateCaching: true,
    },
    browser: {
      // Don't save the response in the browser
      maxAgeSeconds: 0,
      // Save the response in the browser via Layer0 service worker
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
  proxy('image', { path: '/' })
}

export const ASSET_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  // Remove the cache-control header coming in from the Next.js app,
  // and remove the set-cookie header coming in from the Next.js app,
  // this is to ensure that the response is cacheable
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  // Set the caching values
  cache({
    edge: {
      // Save the response(s) [whether stale or updated] in the edge POP for a year
      maxAgeSeconds: 60 * 60 * 24 * 365,
    },
    browser: {
      // Don't save the response in the browser
      maxAgeSeconds: 0,
      // Save the response in the browser via Layer0 service worker
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
}

export const NEXT_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  // Remove the cache-control header coming in from the Next.js app,
  // this is to ensure that the response is cacheable
  removeUpstreamResponseHeader('cache-control')
  // Set the caching values
  cache({
    browser: {
      // Don't save the response in the browser
      maxAgeSeconds: 0,
      // Save the response in the browser via Layer0 service worker
      serviceWorkerSeconds: 60 * 60 * 24,
    },
    edge: {
      // Save the response(s) [whether stale or updated] in the edge POP for a year
      maxAgeSeconds: 60 * 60 * 24 * 365,
      // Keep revalidating data per day, i.e. looking for content changes from the Next.js app
      // and update the response in edge
      // More on: https://web.dev/stale-while-revalidate
      // and https://docs.layer0.co/guides/caching#achieving-100-cache-hit-rates
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  })
}
