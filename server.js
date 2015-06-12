'use strict';

import koa from 'koa';
import serve from 'koa-static';
import serialize from 'serialize-javascript';

import React from 'react';
import Router from 'react-router';
import app from './scripts/app'
import HtmlComponent from './scripts/components/Html.jsx';
import navigateAction from './scripts/actions/navigate';

var htmlComponent = React.createFactory(HtmlComponent);
var server = koa();

server.use(serve(__dirname + '/public'));

server.use(function* () {
  let context = app.createContext();

  let html;
  yield (done) => {
    Router.run(app.getComponent(), this.req.url, function(Handler, state) {
      context.executeAction(navigateAction, state, function(err) {
        let exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        let buildPath;
        if (process.env.NODE_ENV === "development") {
          let hotLoadPort = process.env.HOT_LOAD_PORT || 3030;
          buildPath = `http://localhost:${hotLoadPort}/js/client.js`;
        }
        if (process.env.NODE_ENV === "production") {
          buildPath = '/js/client.js';
        }

        let Component = React.createFactory(Handler);
        html = React.renderToStaticMarkup(htmlComponent({
          state: exposed,
          markup: React.renderToString(Component({context:context.getComponentContext()})),
          buildPath: buildPath || ''
        }));
        done();
      });
    });
  };

  this.body = html;
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);