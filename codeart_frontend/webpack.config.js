var HtmlWebpackPlugin = require('html-webpack-plugin');
var common = require('./webpack.common');
var merge = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: __dirname,
    filename: 'codeart.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Oral History Dev',
      filename: 'index.html',
      template: 'src/index.html',
      favicon: 'src/assets/images/app/favicon.ico',
    }),
  ],
  devServer: {
    contentBase: './dist',
  },
});
