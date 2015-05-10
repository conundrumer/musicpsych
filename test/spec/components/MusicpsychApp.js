'use strict';

describe('MusicpsychApp', function () {
  var React = require('react/addons');
  var MusicpsychApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MusicpsychApp = require('components/MusicpsychApp.js');
    component = React.createElement(MusicpsychApp);
  });

  it('should create a new instance of MusicpsychApp', function () {
    expect(component).toBeDefined();
  });
});
