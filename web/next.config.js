module.exports = {
  // Prefer loading of ES Modules over CommonJS
  experimental: {esmExternals: true},
  webpack: (config, { defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    config.plugins.push(new webpack.IgnorePlugin(/\/__snapshots__\//))
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {/* jsxImportSource: …, otherOptions… */}
        }
      ]
    })
    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
}
