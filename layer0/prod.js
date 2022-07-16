module.exports = async (port) => {
  process.env.PORT = port
  await import('../dist/server.js')
}
