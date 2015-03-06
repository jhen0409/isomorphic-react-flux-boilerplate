'use strict';

var webpack = require('webpack');

var port = process.env.HOT_LOAD_PORT || 3030;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path: __dirname + '/public/js/',
    filename: 'client.js',
    publicPath: 'http://localhost:' + port + '/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: "style!css!sass?indentedSyntax=sass" }
    ]
  }
};