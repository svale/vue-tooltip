var merge = require('webpack-merge')
var base = require('./webpack.config.base')
var path = require('path')

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'v-tooltip.common.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'eval-source-map',
})
