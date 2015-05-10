'use strict';

var React = require('react/addons');
var FormWidget = require('./FormWidget');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var TYPES = require('../formWidgetTypes');
// var UnipolarSlider = require('./UnipolarSlider');
// var BipolarSlider = require('./BipolarSlider');

//var Actions = require('actions/xxx')

require('styles/HomePage.less');

var HomePage = React.createClass({


  render() {
    return (
        <div className='container'>
          <p>Content for HomePage</p>
          <form>
            <FormWidget
              name="sex"
              question="What is your sex?"
              type={TYPES.CHOICE}
              choices={["Male", "Female"]}
            />
            <FormWidget
              name="age"
              question="What is your age?"
              type={TYPES.NUMBER}
              min={0}
              max={120}
            />
            <FormWidget
              name="musical"
              question="Are you a trained musician?"
              type={TYPES.BOOLEAN}
            />
            <Input type='submit' />
          </form>
          <form>
            <FormWidget
              name="happiness"
              question="How happy are you feeling?"
              type={TYPES.UNIPOLAR}
              dimension="happy"
            />
            <FormWidget
              name="valence"
              question="What is the general mood?"
              type={TYPES.BIPOLAR}
              dimension1="negative"
              dimension2="positive"
            />
            <Input type='submit' />
          </form>
        </div>
      );
  }
});

module.exports = HomePage;

