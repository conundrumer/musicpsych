'use strict';

var React = require('react/addons');
var FormWidget = require('./FormWidget');
var FormGroup = require('./FormGroup');
var TYPES = require('../formWidgetTypes');
var FormBuilder = require('./FormBuilder');
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
  name: 'color',
  question: 'Favorite color?',
  type: TYPES.SELECT,
  choices: ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
}, {
  name: 'joke',
  question: 'Whats your favorite joke?',
  type: TYPES.TEXT
}, {
  name: 'longjoke',
  question: 'Whats your favorite longjoke?',
  type: TYPES.TEXTBOX
}, {
  name: 'todo',
  question: 'Whats on your TODO list?',
  type: TYPES.LIST
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

  onUpdate(value) {
    if (value === null) {
      this.replaceState({type: null});
    }
    else {
      this.setState(value);
    }
  },

  getInitialState() {
    return {
      type: null
    };
  },

  render() {
    return (
        <div className=''>
          <p>Content for HomePage</p>
          <FormGroup forms={forms} />
          <FormBuilder onUpdate={(v) => console.log(v)}/>
        </div>
      );
  }
});

module.exports = HomePage;

