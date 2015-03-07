'use strict';
var React = require('react');

var NotFound = React.createClass({
  getInitialState: function () {
    return {};
  },
  render: function() {
    return (
      <h1>Not Found</h1>
    );
  }
});

module.exports = NotFound;
