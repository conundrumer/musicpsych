'use strict';

describe('UnipolarSlider', function () {
  var React = require('react/addons');
  var UnipolarSlider, component;

  beforeEach(function () {
    UnipolarSlider = require('components/UnipolarSlider.js');
    component = React.createElement(UnipolarSlider);
  });

  it('should create a new instance of UnipolarSlider', function () {
    expect(component).toBeDefined();
  });
});
