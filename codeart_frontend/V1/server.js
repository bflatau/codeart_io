var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  disableHostCheck: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  host: '0.0.0.0',
}).listen(3000, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
