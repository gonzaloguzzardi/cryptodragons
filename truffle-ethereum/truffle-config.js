module.exports = {
  networks: {
    development: {
      network_id: '*',
      host: '127.0.0.1',
      port: 8545,
      gas: 4700000
    }
  },
  compilers: {
    solc: {
      version: "0.5.2",
    },
  },
}
