// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edgio.co/guides/edgio_config
module.exports = {
  connector: '@edgio/next',
  routes: './edgio/routes.js',
  backends: {
    // Define a domain or IP address to proxy as a backend
    // More on: https://docs.edgio.co/guides/edgio_config#backends
    api: {
      domainOrIp: 'edgio-docs-edgio-ecommmerce-api-example-default.edgio-limelight.link',
      hostHeader: 'edgio-docs-edgio-ecommmerce-api-example-default.edgio-limelight.link',
      // Disable backend SSL certificate security check, read more on:
      // https://docs.edgio.co/guides/edgio_config#:~:text=browser%20is%20used.-,disableCheckCert,-Boolean
      disableCheckCert: true,
    },
    // More on: https://docs.edgio.co/guides/image_optimization
    image: {
      domainOrIp: 'opt.moovweb.net',
      hostHeader: 'opt.moovweb.net',
      disableCheckCert: true,
    },
  },
}
