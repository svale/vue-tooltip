var webpack = require('webpack')
var merge = require('webpack-merge')
var base = require('./webpack.config.base')
var path = require('path')

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'v-tooltip.browser.js',
    library: 'VTooltip',
    libraryTarget: 'umd',
  },
  externals: {
    'tether-drop': 'Drop',
    'tether-tooltip': 'Tooltip',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: false,
    }),
  ],
})
