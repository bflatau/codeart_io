var HtmlWebpackPlugin = require('html-webpack-plugin');
var common = require('./webpack.common');
var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'code-art-ui-[hash].min.js',
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: 'Code Art',
      favicon: 'src/assets/images/app/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
