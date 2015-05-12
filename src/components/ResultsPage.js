'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Table = Bootstrap.Table;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var Popover = Bootstrap.Popover;
var Router = require('react-router');
var State = Router.State;
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var FIREBASE_URL = 'https://popping-torch-2685.firebaseio.com/';

//var Actions = require('actions/xxx')

require('styles/ResultsPage.less');

var TestDataTable = React.createClass({

  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          {
            <tr>
              <td key={-1}>
                #
              </td>
              {
                _.keys(this.props.data[0].variables).map((name, i) =>
                  <td key={i}>
                    {name}
                  </td>
                )
              }
              {
                _.keys(this.props.data[0].results).map((name, i) =>
                  <td key={i}>
                    {name}
                  </td>
                )
              }
            </tr>
          }
        </thead>
        <tbody>
          {
            this.props.data.map((d, i) =>
              <OverlayTrigger
                key={i}
                trigger='click'
                placement='top'
                overlay={
                  <Popover>
                    <ParticipantDataTable
                      data={{
                        [d.id]: this.props.participantData[d.id]
                      }}
                    />
                  </Popover>
                }
              >
                <tr>
                  <td key={-1}>
                    {i + 1}
                  </td>
                  {
                    _.values(d.variables).map((value, j) =>
                      <td key={j}>
                        {value}
                      </td>
                    )
                  }
                  {
                    _.values(d.results).map((value, j) =>
                      <td key={j}>
                        {value}
                      </td>
                    )
                  }
                </tr>
              </OverlayTrigger>
            )
          }
        </tbody>
      </Table>
    );
  }
});

var ParticipantDataTable = React.createClass({

  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          {
            <tr>
              <td key={-1}>
                #
              </td>
              {
                _.keys(_.values(this.props.data)[0]).map((name, i) =>
                  <td key={i}>
                    {name}
                  </td>
                )
              }
            </tr>
          }
        </thead>
        <tbody>
          {
            _.values(this.props.data).map((d, i) =>
              <tr key={i}>
                <td key={-1}>
                  {i + 1}
                </td>
                {
                  _.values(d).map((value, j) =>
                    <td key={j}>
                      {value}
                    </td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </Table>
    );
  }

})

var ResultsPage = React.createClass({

  mixins: [ State, ReactFireMixin ],

  componentWillMount() {
    this.fb = new Firebase(FIREBASE_URL);
    var data = this.fb.child('data').child(this.getParams().name);
    this.bindAsArray(data.child('test'), 'data');
    this.bindAsObject(data.child('participant'), 'participantData');
  },

  getInitialState() {
    return {
      data: undefined,
      participantData: undefined
    };
  },

  render: function () {
    if (this.state.data === undefined || this.state.participantData === undefined) {
      return <div>Loading...</div>;
    }
    if (this.state.data === null || this.state.participantData === null) {
      return <div>Experiment not found</div>;
    }
    return (
        <div>
          <h2>Results for {this.getParams().name}</h2>
          <p>Click on a row to see participant data</p>
          <TestDataTable data={this.state.data} participantData={this.state.participantData} />
          <ParticipantDataTable data={this.state.participantData} />
        </div>
      );
  }
});

module.exports = ResultsPage;

