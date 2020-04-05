module.exports = {
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|vendor)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          'file-loader?name=images/[folder]/[name].[ext]',
          'image-webpack-loader?bypassOnDebug',
        ],
      },
      {
        test: /\.pdf$/i,
        loader: 'file-loader?name=pdfs/[name].[ext]',
      },
      {
        test: /new-fonts\/svg-fonts\/.*\.(?:eot|otf|svg|ttf|woff)(?:\?[a-z0-9=\.]+)?$/i,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  entry: {
    app: './src/index.js',
  },
  devtool: '#source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
};
