'use strict';
import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import App from './App.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';

export default (
  <Route name="app" path="/" handler={App}>
    <Route name="about" handler={About}/>
    <DefaultRoute name="home" handler={Home}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);