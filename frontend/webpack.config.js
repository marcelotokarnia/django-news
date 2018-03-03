const HtmlWebPackPlugin = require('html-webpack-plugin')
const BundleTracker = require('webpack-bundle-tracker')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
