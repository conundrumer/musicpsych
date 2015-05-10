'use strict';

describe('FormWidget', function () {
  var React = require('react/addons');
  var FormWidget, component;

  beforeEach(function () {
    FormWidget = require('components/FormWidget.js');
    component = React.createElement(FormWidget);
  });

  it('should create a new instance of FormWidget', function () {
    expect(component).toBeDefined();
  });
});
