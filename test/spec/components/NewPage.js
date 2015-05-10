'use strict';

describe('NewPage', function () {
  var React = require('react/addons');
  var NewPage, component;

  beforeEach(function () {
    NewPage = require('components/NewPage.js');
    component = React.createElement(NewPage);
  });

  it('should create a new instance of NewPage', function () {
    expect(component).toBeDefined();
  });
});
