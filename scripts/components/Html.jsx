'use strict';
var React = require('react');

var Html = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
          <noscript>
            <link rel="stylesheet" href="/css/style.css" />
          </noscript>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src={this.props.buildPath} defer></script>
      </html>
    );
  }
});

module.exports = Html;
