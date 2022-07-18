module.exports = {
  connector: './layer0',
  routes: './layer0/routes.js',
  backends: {
    // Define a domain or IP address to proxy as a backend
    // More on: https://docs.layer0.co/guides/layer0_config#backends
    api: {
      domainOrIp: 'layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link',
      hostHeader: 'layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link',
      // Disable backend SSL certificate security check, read more on:
      // https://docs.layer0.co/guides/layer0_config#:~:text=browser%20is%20used.-,disableCheckCert,-Boolean
      disableCheckCert: true,
    },
    // More on: https://docs.layer0.co/guides/image_optimization
    image: {
      domainOrIp: 'opt.moovweb.net',
      hostHeader: 'opt.moovweb.net',
      disableCheckCert: true,
    },
  },
}
