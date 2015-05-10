'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Bootstrap = require('react-bootstrap');
var PageHeader = Bootstrap.PageHeader;

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
      <div className='container'>
        <ReactCSSTransitionGroup transitionName="app-fade">
          {
            !this.state.mounted ? null :
            <div>
              <PageHeader>Online Music Psychology Studies</PageHeader>
              <RouteHandler/>
            </div>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = App;
