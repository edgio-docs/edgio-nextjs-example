const { withEdgio, withServiceWorker } = require('@edgio/next/config')

const _preEdgioExport = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/commerce/:name',
        destination: '/commerce',
      },
    ]
  },
}

module.exports = (phase, config) =>
  withEdgio(
    withServiceWorker({
      // Output sourcemaps so that stack traces have original source filenames and line numbers when tailing
      // the logs in the Edgio developer console.
      edgioSourceMaps: true,

      ..._preEdgioExport,
    })
  )
