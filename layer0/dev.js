const { createDevServer } = require('@layer0/core/dev')

module.exports = function () {
  return createDevServer({
    label: 'Next.js Standalone',
    command: (port) => `PORT=${port} npm run dev`,
    ready: [/started server/i],
  })
}
