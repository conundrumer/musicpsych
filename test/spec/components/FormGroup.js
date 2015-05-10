'use strict';

describe('FormGroup', function () {
  var React = require('react/addons');
  var FormGroup, component;

  beforeEach(function () {
    FormGroup = require('components/FormGroup.js');
    component = React.createElement(FormGroup);
  });

  it('should create a new instance of FormGroup', function () {
    expect(component).toBeDefined();
  });
});
