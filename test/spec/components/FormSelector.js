'use strict';

describe('FormSelector', function () {
  var React = require('react/addons');
  var FormSelector, component;

  beforeEach(function () {
    FormSelector = require('components/FormSelector.js');
    component = React.createElement(FormSelector);
  });

  it('should create a new instance of FormSelector', function () {
    expect(component).toBeDefined();
  });
});
