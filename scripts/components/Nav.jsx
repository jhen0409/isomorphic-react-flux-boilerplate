'use strict';
var React = require('react');
var Link = require('react-router').Link;
var StateMixin = require('react-router').State;

var Nav = React.createClass({
  mixins: [StateMixin],
  render: function() {
    return (
      <ul className="nav nav-pills">
        <li className={this.isActive('/') ? 'active' : ''}><Link to='/'>Home</Link></li>
        <li className={this.isActive('/about') ? 'active' : ''}><Link to='/about'>About</Link></li>
      </ul>
    );
  }
});

module.exports = Nav;
