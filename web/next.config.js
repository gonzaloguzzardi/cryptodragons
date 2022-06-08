module.exports = {
  // experimental: { esmExternals: true },
  webpack: (config, { defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.WatchIgnorePlugin({ paths: [ /\/__tests__\//, /\/__snapshots__\// ] }))
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
