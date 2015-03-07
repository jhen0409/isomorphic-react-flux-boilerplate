var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;
var App = require('./App.jsx');
var Home = require('./Home.jsx');
var About = require('./About.jsx');
var NotFound = require('./NotFound.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="about" handler={About}/>
    <DefaultRoute name="home" handler={Home}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = routes;