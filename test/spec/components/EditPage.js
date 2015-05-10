'use strict';

describe('EditPage', function () {
  var React = require('react/addons');
  var EditPage, component;

  beforeEach(function () {
    EditPage = require('components/EditPage.js');
    component = React.createElement(EditPage);
  });

  it('should create a new instance of EditPage', function () {
    expect(component).toBeDefined();
  });
});
