'use strict';

describe('ExperimentPage', function () {
  var React = require('react/addons');
  var ExperimentPage, component;

  beforeEach(function () {
    ExperimentPage = require('components/ExperimentPage.js');
    component = React.createElement(ExperimentPage);
  });

  it('should create a new instance of ExperimentPage', function () {
    expect(component).toBeDefined();
  });
});
