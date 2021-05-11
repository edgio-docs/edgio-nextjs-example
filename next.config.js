// This file was automatically added by xdn init.
// You should commit this file to source control.

const { withLayer0, withServiceWorker } = require('@layer0/next/config')

module.exports = withLayer0(withServiceWorker({ future: { webpack5: true } }))
