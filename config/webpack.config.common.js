var merge = require('webpack-merge')
var base = require('./webpack.config.base')
var path = require('path')

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'v-tooltip.common.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    'tether-drop': 'tether-drop',
    'tether-tooltip': 'tether-tooltip',
  },
  target: 'node',
  devtool: '#inline-source-map',
})
