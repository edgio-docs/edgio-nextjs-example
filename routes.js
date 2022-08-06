// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')
const getPathsToPrerender = require('@/layer0/prerenderRequests')
const { API_CACHE_HANDLER, ASSET_CACHE_HANDLER, NEXT_CACHE_HANDLER, IMAGE_CACHE_HANDLER } = require('@/layer0/cache')

module.exports = new Router()
  // Regex to catch multiple hostnames
  // Any deployment will have a L0 permalink
  // Don't allow Google bot to crawl it, read more on:
  // https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  .noIndexPermalink()
  // Pre-render the static home page
  // By pre-rendering, once the project is deployed
  // the set of links are visited to warm the cache
  // for future visits (expected to be the first view for real users)
  // More on static prerendering: https://docs.layer0.co/guides/static_prerendering
  .prerender(getPathsToPrerender)
  // Serve the old Layer0 predefined routes by the latest prefix
  .match('/__xdn__/:path*', ({ redirect }) => {
    redirect('/__layer0__/:path*', 301)
  })
  // Serve the compiled service worker with Layer0 prefetcher working
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  // The data in Next.js comes through _next/data/project-build-id route.
  // For the route /product/product-slug, cache this SSR route's data
  // it on the edge so that can be prefetched
  .match('/_next/data/:path*', NEXT_CACHE_HANDLER)
  // Asset caching
  .match('/logo/:path*', ASSET_CACHE_HANDLER)
  .match('/_next/static/:path*', ASSET_CACHE_HANDLER)
  // API (Any backend) caching
  .match('/l0-api/:path*', API_CACHE_HANDLER)
  // Image caching
  .match('/l0-opt', IMAGE_CACHE_HANDLER)
  .static('public')
  // Use the default set of Next.js routes
  .use(nextRoutes)
