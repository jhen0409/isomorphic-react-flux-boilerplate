var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var App = require('./App.jsx');
var Home = require('./Home.jsx');
var About = require('./About.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="about" handler={About}/>
    <DefaultRoute name="home" handler={Home}/>
  </Route>
);

module.exports = routes;