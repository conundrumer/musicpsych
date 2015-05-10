'use strict';

var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var UnipolarSlider = require('./UnipolarSlider');
var BipolarSlider = require('./BipolarSlider');

//var Actions = require('actions/xxx')

require('styles/HomePage.less');

var HomePage = React.createClass({


  render() {
    return (
        <div className='container'>
          <p>Content for HomePage</p>
          <form>
            <label>What is your sex?</label>
            <Input name='sex' type='radio' label='Male' value='Male' required />
            <Input name='sex' type='radio' label='Female' value='Female' required />
            <label>What is your age?</label>
            <Input name='age' type='number' min='0' required />
            <label>Are you a trained musician?</label>
            <Input name='musical' type='radio' label='Yes' value='Yes' required />
            <Input name='musical' type='radio' label='No' value='No' required />
            <label>How happy are you feeling?</label>
            <UnipolarSlider dimension='happy' />
            <label>What do you feel is the valence of this thing?</label>
            <BipolarSlider dimension1='negative' dimension2='positive' />
          </form>
        </div>
      );
  }
});

module.exports = HomePage;

