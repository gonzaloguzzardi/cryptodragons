module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    config.plugins.push(new webpack.IgnorePlugin(/\/__snapshots__\//))
    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
}
