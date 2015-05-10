'use strict';

var MusicpsychApp = require('./MusicpsychApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={MusicpsychApp}>
    <Route name="/" handler={MusicpsychApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
