'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var Bootstrap = require('react-bootstrap');
var Panel = Bootstrap.Panel;


//var Actions = require('actions/xxx')

require('styles/ManagePage.less');

var ManagePage = React.createClass({

  render: function () {
    return (
        <Panel header={<h2>Manage Experiments</h2>}>
          <ul>
            <li><Link to="edit">Edit</Link></li>
            <li><Link to="new">New</Link></li>
          </ul>
        </Panel>
      );
  }
});

module.exports = ManagePage;

