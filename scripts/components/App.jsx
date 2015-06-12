'use strict';
import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import Nav from './Nav.jsx';
import { RouteHandler } from 'react-router';
import { connectToStores, provideContext } from 'fluxible/addons';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <RouteHandler />
      </div>
    );
  }
}

App = provideContext(connectToStores(App, [ApplicationStore], (stores, props) => {
  return stores.ApplicationStore.getState();
}));

export default App;