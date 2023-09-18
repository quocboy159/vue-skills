const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    // Ignore all locale files of moment.js
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  },

  pluginOptions: {
    quasar: {
      rtlSupport: true,
    },
  },

  transpileDependencies: [/node_modules\/quasar\//],

  devServer: {
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/_shared.scss";`,
      },
    },
  },
}
