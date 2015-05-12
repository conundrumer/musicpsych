'use strict';

describe('ResultsPage', function () {
  var React = require('react/addons');
  var ResultsPage, component;

  beforeEach(function () {
    ResultsPage = require('components/ResultsPage.js');
    component = React.createElement(ResultsPage);
  });

  it('should create a new instance of ResultsPage', function () {
    expect(component).toBeDefined();
  });
});
