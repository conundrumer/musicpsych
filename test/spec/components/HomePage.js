'use strict';

describe('HomePage', function () {
  var React = require('react/addons');
  var HomePage, component;

  beforeEach(function () {
    HomePage = require('components/HomePage.js');
    component = React.createElement(HomePage);
  });

  it('should create a new instance of HomePage', function () {
    expect(component).toBeDefined();
  });
});
