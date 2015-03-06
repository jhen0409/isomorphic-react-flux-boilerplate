require("babel/register");

var koa = require('koa');
var favicon = require('koa-favicon');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var methodOverride = require('koa-methodoverride');
var compress = require('koa-compress');
var session = require('koa-session');
var csrf = require('koa-csrf');
var route = require('koa-route');

var serialize = require('serialize-javascript');

var React = require('react');
var app = require('./scripts/app');
var Router = require('react-router');
var HtmlComponent = React.createFactory(require('./scripts/components/Html.jsx'));
var navigateAction = require('./scripts/actions/navigate');

var server = koa();

server.use(favicon(__dirname + '/public/favicon.ico'));
server.use(bodyParser());
server.use(methodOverride());
server.use(compress());
server.keys = [ 'blablablabla' ];
server.use(session(server));
server.use(serve(__dirname + '/public'));

server.use(function* () {
  var context = app.createContext();

  var self = this;
  var html;
  yield function(done) {
    Router.run(app.getAppComponent(), self.req.url, function (Handler, state) {
      context.executeAction(navigateAction, state, function (err) {
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        var buildPath;
        if (process.env.NODE_ENV === "development") {
          var hotLoadPort = process.env.HOT_LOAD_PORT || 3030;
          buildPath = 'http://localhost:' + hotLoadPort + '/js/client.js'
        }
        if (process.env.NODE_ENV === "production") {
          buildPath = '/js/client.js'
        }

        var Component = React.createFactory(Handler);
        html = React.renderToStaticMarkup(HtmlComponent({
          state: exposed,
          markup: React.renderToString(Component({context:context.getComponentContext()})),
          buildPath: buildPath || ''
        }));
        done();
      });
    });
  };

  self.body = html;
});


var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);