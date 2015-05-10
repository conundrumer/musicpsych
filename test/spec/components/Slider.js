'use strict';

describe('Slider', function () {
  var React = require('react/addons');
  var Slider, component;

  beforeEach(function () {
    Slider = require('components/Slider.js');
    component = React.createElement(Slider);
  });

  it('should create a new instance of Slider', function () {
    expect(component).toBeDefined();
  });
});
