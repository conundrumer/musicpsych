'use strict';

describe('Stimulus', function () {
  var React = require('react/addons');
  var Stimulus, component;

  beforeEach(function () {
    Stimulus = require('components/Stimulus.js');
    component = React.createElement(Stimulus);
  });

  it('should create a new instance of Stimulus', function () {
    expect(component).toBeDefined();
  });
});
