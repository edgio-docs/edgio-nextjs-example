// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edgio.co/guides/edgio_config
module.exports = {
  connector: '@edgio/next',
  routes: './edgio/routes.js',
  backends: {
    // More on: https://docs.edgio.co/guides/image_optimization
    image: {
      domainOrIp: 'opt.moovweb.net',
      hostHeader: 'opt.moovweb.net',
      disableCheckCert: true,
    },
  },
}
