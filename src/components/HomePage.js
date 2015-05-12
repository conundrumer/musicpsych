'use strict';

var _ = require('lodash');
var React = require('react/addons');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Bootstrap = require('react-bootstrap');
var ButtonGroup = Bootstrap.ButtonGroup;
var Panel = Bootstrap.Panel;
var RouterBootstrap = require('react-router-bootstrap');
var ButtonLink = RouterBootstrap.ButtonLink;

var FIREBASE_URL = 'https://popping-torch-2685.firebaseio.com/';
//var Actions = require('actions/xxx')

require('styles/HomePage.less');

var HomePage = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount: function() {
    this.bindAsObject(new Firebase(FIREBASE_URL).child('experiments'), 'experiments');
  },

  getInitialState() {
    return {
      experiments: {}
    };
  },

  render() {
    return (
        <div className=''>
          {
            _.keys(this.state.experiments).map((experiment, i) =>
              <Panel key={i} header={experiment}>
              <ButtonGroup>
                <ButtonLink to={`/experiment/${experiment}`}>View</ButtonLink>
                <ButtonLink to={`/edit/${experiment}`}>Edit</ButtonLink>
                <ButtonLink to={`/results/${experiment}`}>Results</ButtonLink>
              </ButtonGroup>
              </Panel>
            )
          }
          <ButtonLink to='new'>New Experiment</ButtonLink>
        </div>
      );
  }
});

module.exports = HomePage;

