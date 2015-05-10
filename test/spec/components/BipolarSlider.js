'use strict';

describe('BipolarSlider', function () {
  var React = require('react/addons');
  var BipolarSlider, component;

  beforeEach(function () {
    BipolarSlider = require('components/BipolarSlider.js');
    component = React.createElement(BipolarSlider);
  });

  it('should create a new instance of BipolarSlider', function () {
    expect(component).toBeDefined();
  });
});
