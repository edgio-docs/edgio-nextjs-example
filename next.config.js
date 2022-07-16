const _preLayer0Export = {
  output: 'standalone',
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
}

module.exports = _preLayer0Export
