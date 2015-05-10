'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;

//var Actions = require('actions/xxx')

require('styles/NewPage.less');

var NewPage = React.createClass({

  getInitialState() {
    return {
      toggled: false
    };
  },

  render: function () {
    return (
        <div>
          <p>Content for NewPage!</p>
          <Button onClick={
            () => this.setState({toggled: !this.state.toggled})
          } >say hi</Button>
          <ReactCSSTransitionGroup transitionName="fade">
            { this.state.toggled ? <p>hi</p> : null }
          </ReactCSSTransitionGroup>
        </div>
      );
  }
});

module.exports = NewPage;

