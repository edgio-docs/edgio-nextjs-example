const { withLayer0, withServiceWorker } = require('@layer0/next/config')

const _preLayer0Export = {
  // With latest Next.js using the target: 'server'
  // More on: https://docs.layer0.co/guides/next#nextjs-12-with-server-target-deprecations
  target: 'server',
  // Rewrite the pages, path
  // More on how it works
  // with Layer0 at
  // https://docs.layer0.co/guides/next#rewrites-and-redirects
  async rewrites() {
    return [
      {
        source: '/commerce/:path*',
        destination: '/commerce',
      },
    ]
  },
  // For image optimization using Next.js Image's component
  // Read more on: https://nextjs.org/docs/basic-features/image-optimization
  images: {
    domains: ['layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link'],
  },
}

module.exports = (phase, config) =>
  withLayer0(
    withServiceWorker({
      // Existing Next.js Config
      ..._preLayer0Export,
      // Layer0 Source Maps for debugging
      // More on Layer0 Source Maps
      // https://docs.layer0.co/guides/next#withlayer0
      layer0SourceMaps: true,
      // Disable Layer0 Devtools that are added
      // by default with a Next.js app in production
      // To be documented in Layer0 docs
      disableLayer0DevTools: true
    })
  )
