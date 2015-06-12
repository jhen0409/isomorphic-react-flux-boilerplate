'use strict';
import React from 'react';
import { State, Link } from 'react-router';
import reactMixin from 'react-mixin';

class Nav extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills">
        <li className={this.isActive('/') ? 'active' : ''}><Link to='/'>Home</Link></li>
        <li className={this.isActive('/about') ? 'active' : ''}><Link to='/about'>About</Link></li>
      </ul>
    );
  }
}

reactMixin.onClass(Nav, State);

export default Nav;