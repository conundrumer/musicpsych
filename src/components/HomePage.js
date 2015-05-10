'use strict';

var React = require('react/addons');
var FormWidget = require('./FormWidget');
var FormGroup = require('./FormGroup');
var TYPES = require('../formWidgetTypes');
// var UnipolarSlider = require('./UnipolarSlider');
// var BipolarSlider = require('./BipolarSlider');

//var Actions = require('actions/xxx')

require('styles/HomePage.less');

var forms = [{
  name: 'sex',
  question: 'What is your sex?',
  type: TYPES.CHOICE,
  choices: ['Male', 'Female']
}, {
  name: 'age',
  question: 'What is your age?',
  type: TYPES.NUMBER,
  min: 0,
  max: 120
}, {
  name: 'musical',
  question: 'Are you a trained musician?',
  type: TYPES.BOOLEAN
}, {
  name: 'happiness',
  question: 'How happy are you feeling?',
  type: TYPES.UNIPOLAR,
  dimension: 'happy'
}, {
  name: 'valence',
  question: 'What is the general mood?',
  type: TYPES.BIPOLAR,
  dimension1: 'negative',
  dimension2: 'positive'
}];

var HomePage = React.createClass({

  render() {
    return (
        <div className='container'>
          <p>Content for HomePage</p>
          <FormGroup forms={forms} />
        </div>
      );
  }
});

module.exports = HomePage;

