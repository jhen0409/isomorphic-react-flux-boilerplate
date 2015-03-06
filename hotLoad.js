var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = process.env.HOT_LOAD_PORT || 3030;

new WebpackDevServer(webpack(config), {
  contentBase: 'http://localhost:' + port,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3030, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('(Hot Load) Listening at localhost:' + port);
});