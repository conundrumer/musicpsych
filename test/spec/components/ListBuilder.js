'use strict';

describe('ListBuilder', function () {
  var React = require('react/addons');
  var ListBuilder, component;

  beforeEach(function () {
    ListBuilder = require('components/ListBuilder.js');
    component = React.createElement(ListBuilder);
  });

  it('should create a new instance of ListBuilder', function () {
    expect(component).toBeDefined();
  });
});
