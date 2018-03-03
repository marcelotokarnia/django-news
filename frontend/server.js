const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: 'http://localhost:3000/dist',
  hot: true,
  inline: true,
  historyApiFallback: true,
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }

  console.log('Listening at 0.0.0.0:3000')
})
