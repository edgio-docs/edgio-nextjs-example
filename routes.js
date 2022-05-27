// Determine the buildId from the build of Next.js app
let buildId = undefined
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID')

if (existsSync(buildIdPath)) {
  buildId = readFileSync(buildIdPath, 'utf8')
}

// Import libraries to fetch and create prerender and Layer0 routes
import fetch from 'node-fetch'
import { nextRoutes } from '@layer0/next'
import { Router } from '@layer0/core/router'

// Function definition referred from node_modules/@layer0/next/client.js
const createNextDataURL = (params) => {
  if (buildId) {
    let { href, routeParams = {} } = params
    if (href.endsWith('/')) {
      href += 'index'
    }
    let qs = ''
    if (routeParams) {
      const keys = Object.keys(routeParams)
      if (keys.length) {
        qs = '?' + keys.map((key) => `${key}=${encodeURIComponent(routeParams[key])}`).join('&')
      }
    }
    return `/_next/data/${buildId}${href}.json${qs}`
  }
  return undefined
}

const ASSET_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  // Remove the cache-control header coming in from the Next.js app, this is to
  // ensure that the response is cacheable
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

const NEXT_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  // Remove the cache-control header coming in from the Next.js app, this is to
  // ensure that the response is cacheable
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

// Function to create all the paths to prerender
async function getPathsToPrerender() {
  const prerenderPaths = ['/']
  // Get all the slugs for the product pages
  const respCall = await fetch('https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link/products/all')
  if (respCall.ok) {
    const resp = await respCall.json()
    // For each product, derive the non slash path and create the next data url to populate on the edge
    resp.forEach((i) => {
      const nonSlashPath = i.path.replace(/\//g, '')
      prerenderPaths.push(
        // Using createNextDataURL, make it easier to generate Next.js data json(s)
        createNextDataURL({
          href: `/product/${nonSlashPath}`,
          routeParams: {
            name: nonSlashPath,
          },
        })
      )
    })
  } else {
    console.log('The fetch call failed, no paths to populate cache with.')
  }
  // Finally, return all the paths with the intended mapping to Layer0 prerender syntax
  return prerenderPaths.filter((i) => i).map((i) => ({ path: i }))
}

module.exports = new Router()
  // Pre-render the static home page
  // By pre-rendering, once the project is deployed
  // the set of links are visited to warm the cache
  // for future visits (expected to be the first view for real users)
  // More on static prerendering: https://docs.layer0.co/guides/static_prerendering
  .prerender(getPathsToPrerender)
  // Serve the compiled service worker with Layer0 prefetcher working
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  // The data in Next.js comes through _next/data/project-build-id route.
  // For the route /product/product-slug, cache it on the edge so that
  // can be prefetched
  .match('/_next/data/:build/index.json', NEXT_CACHE_HANDLER)
  .match('/_next/data/:build/search.json', NEXT_CACHE_HANDLER)
  .match('/_next/data/:build/product/:id.json', NEXT_CACHE_HANDLER)
  // Asset caching
  .match('/images/:path*', ASSET_CACHE_HANDLER)
  // Use the default set of Next.js routes
  .use(nextRoutes)
