'use strict';

var webpack = require('webpack');
var path = require('path');
var port = process.env.HOT_LOAD_PORT || 3030;

var config = {
  devtool: 'eval',
  entry: [
    './client'
  ],
  output: {
    path: __dirname + '/public/js/',
    filename: 'client.js',
    publicPath: 'http://localhost:' + port + '/js/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!raw-loader!sass-loader?includePaths[]=' + path.resolve(__dirname, 'node_modules') }
    ]
  }
};
if (process.env.NODE_ENV === 'development') {
  config.entry.push('webpack-dev-server/client?http://localhost:' + port);
  config.entry.push('webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = config;