'use strict';

var App = require('./App');
var ManagePage = require('./ManagePage');
var HomePage = require('./HomePage');
var NewPage = require('./NewPage');
var EditPage = require('./EditPage');
var ExperimentPage = require('./ExperimentPage');
var ResultsPage = require('./ResultsPage');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var content = document.getElementById('content');

var Routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={HomePage} />
    <Route name="manage" handler={ManagePage} />
    <Route name="new" handler={NewPage} />
    <Route name="edit" path="edit/:name" handler={EditPage} />
    <Route name="experiment" path="experiment/:name" handler={ExperimentPage}>
      <DefaultRoute name="intro" />
      <Route path=":state" />
    </Route>
    <Route name="meta" path="meta/:name" />
    <Route name="results" path="results/:name" handler={ResultsPage} />
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
