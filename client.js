'use strict';
require('!style!raw!sass!./sass/style.scss');

var React = require('react');
var app = require('./scripts/app');
var dehydratedState = window.App;
var Router = require('react-router');
var HistoryLocation = Router.HistoryLocation;
var navigateAction = require('./scripts/actions/navigate');

window.React = React;

function RenderApp(context, Handler){
  var mountNode = document.getElementById('app');
  var Component = React.createFactory(Handler);
  React.render(Component({context:context.getComponentContext()}), mountNode, function() {});
}

app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }
  window.context = context;

  var firstRender = true;
  Router.run(app.getAppComponent(), HistoryLocation, function(Handler, state) {
    if (firstRender) {
      RenderApp(context, Handler);
      firstRender = false;
    } else {
      context.executeAction(navigateAction, state, function() {
        RenderApp(context, Handler);
      });
    }
  });
});