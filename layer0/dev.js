const esbuild = require('esbuild')
const { createDevServer } = require('@layer0/core/dev')

module.exports = function () {
  const appDir = process.cwd()
  esbuild.buildSync({
    entryPoints: [`${appDir}/sw/service-worker.js`],
    outfile: `${appDir}/dist/service-worker.js`,
    minify: true,
    bundle: true,
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.LAYER0_PREFETCH_HEADER_VALUE': '"1"',
      'process.env.LAYER0_PREFETCH_CACHE_NAME': '"prefetch"',
    },
  })
  return createDevServer({
    label: 'Next.js Standalone',
    command: (port) => `PORT=${port} npm run dev`,
    ready: [/started server/i],
  })
}
