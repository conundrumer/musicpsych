'use strict';

describe('Admin', function () {
  var React = require('react/addons');
  var Admin, component;

  beforeEach(function () {
    Admin = require('components/Admin.js');
    component = React.createElement(Admin);
  });

  it('should create a new instance of Admin', function () {
    expect(component).toBeDefined();
  });
});
