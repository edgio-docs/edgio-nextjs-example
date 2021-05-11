// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
require('dotenv').config()
const { join } = require('path')

module.exports = {
  connector: '@layer0/next',
  includeFiles: {
    [join('.next', 'BUILD_ID')]: true,
  },
  backends: {
    api: {
      domainOrIp: 'layer0-docs-layer0-examples-api-default.layer0.link',
      hostHeader: 'layer0-docs-layer0-examples-api-default.layer0.link',
    },
  },
}
