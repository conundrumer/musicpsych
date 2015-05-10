'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// for bootstrap
window.jQuery = require('jquery');
// CSS
require('normalize.css');
require('bootstrap-webpack');
require('../styles/main.less');


var App = React.createClass({

  getInitialState() {
    return {
      mounted: false
    };
  },

  componentDidMount() {
    this.setState({ mounted: true });
  },

  render() {
    return (
      <div className='main'>
        <ReactCSSTransitionGroup transitionName="app-fade">
          {
            !this.state.mounted ? null :
            <div>
              <p>hello world</p>
              <ul>
                <li><Link to="new">New</Link></li>
                <li><Link to="edit">Edit</Link></li>
              </ul>
              <RouteHandler/>
            </div>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = App;
