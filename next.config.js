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
        source: '/search/:path*',
        destination: '/search',
      },
    ]
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
    })
  )
