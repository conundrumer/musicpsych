'use strict';

describe('FormBuilder', function () {
  var React = require('react/addons');
  var FormBuilder, component;

  beforeEach(function () {
    FormBuilder = require('components/FormBuilder.js');
    component = React.createElement(FormBuilder);
  });

  it('should create a new instance of FormBuilder', function () {
    expect(component).toBeDefined();
  });
});
