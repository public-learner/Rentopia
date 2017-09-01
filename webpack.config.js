const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
     { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
     { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] }
   ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new HardSourceWebpackPlugin({
      cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
      recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
      configHash: require('node-object-hash')({sort: false}).hash,
    })
  ]
}

module.exports = config
