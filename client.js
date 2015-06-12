'use strict';
require('!style!raw!sass!./sass/style.scss');

import React from 'react';
import Router from 'react-router';
import app from './scripts/app';
import navigateAction from './scripts/actions/navigate';

const HistoryLocation = Router.HistoryLocation;
const dehydratedState = window.App;
window.React = React;

function RenderApp(context, Handler){
  var mountNode = document.getElementById('app');
  var Component = React.createFactory(Handler);
  React.render(Component({context:context.getComponentContext()}), mountNode);
}

app.rehydrate(dehydratedState, function(err, context) {
  if (err) {
    throw err;
  }
  window.context = context;

  var firstRender = true;
  Router.run(app.getComponent(), HistoryLocation, function(Handler, state) {
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