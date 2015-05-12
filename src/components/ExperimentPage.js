'use strict';

var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Well = Bootstrap.Well;
var RouterBootstrap = require('react-router-bootstrap');
var ButtonLink = RouterBootstrap.ButtonLink;
var marked = require('marked');
var Router = require('react-router');
var State = Router.State;
var Navigation = Router.Navigation;
var Firebase = require('firebase');
var FIREBASE_URL = 'https://popping-torch-2685.firebaseio.com/';

var FormGroup = require('./FormGroup');
var Stimulus = require('./Stimulus');
var experiment = require('../exampleExperiment');

function alertIfError(err) {
  if (err) {
    alert('Something went wrong with saving your input!');
  } else {
    console.log('successfully sent data');
  }
}

//var Actions = require('actions/xxx')

require('styles/ExperimentPage.less');

// TODO: GET SESSION IDS
// https://gist.github.com/gordonbrander/2230317
var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

var ExperimentPage = React.createClass({
  mixins: [ State, Navigation ],

  componentWillMount() {
    this.fb = new Firebase(FIREBASE_URL);
  },

  getInitialState() {
    return {
      participantID: ID(),
      numTests: 0,
      testData: {},
      participantData: {}
    };
  },

  getPageState() {
    switch (this.getParams().state) {
      case undefined: // intro page
        return {
          next: 'test'
        };
      case 'inter-test':
        return {
          next: 'test',
          exit: 'post-test'
        };
      case 'post-test':
        return {
          next: 'participant'
        };
      case 'end':
        return {
          extern: {
            name: 'See the results of this experiment',
            href: `/results/${this.getParams().name}`
          }
        };
      case 'test':
        return {
          title: 'Test Survey ' + this.state.numTests,
          submit: 'inter-test',
          stimulus: experiment.formData.stimulus,
          instruments: experiment.formData.instruments,
          exit: 'post-test'
        };
      case 'participant':
        return {
          title: 'Participant Survey',
          submit: 'end',
          exit: 'end'
        };
    }
  },

  onValue(name, value) {
    var data;
    switch (this.getParams().state) {
      case 'test':
        data = this.state.testData;
        data[name] = value;
        this.setState({testData: data});
        break;
      case 'participant':
        data = this.state.participantData;
        data[name] = value;
        this.setState({participantData: data});
        //send the data

    }
  },

  onSubmit() {
    switch (this.getParams().state) {
      case 'test':
        console.log(
          'sending test data',
          this.state.participantID,
          this.state.numTests,
          this.state.testData
        );
        // send the data
        this.fb
          .child('data')
          .child(this.getParams().name)
          .child('test')
          .push({
            id: this.state.participantID,
            time: Date.now(),
            results: this.state.testData,
            variables: this.refs.stimulus.getVariables()
          }, alertIfError);
        this.setState({
          numTests: this.state.numTests + 1,
          testData: {}
        });
        break;
      case 'participant':
        console.log(
          'sending participant data',
          this.state.participantID,
          this.state.numTests,
          this.state.participantData
        );
        //send the data
        this.fb
          .child('data')
          .child(this.getParams().name)
          .child('participant')
          .child(this.state.participantID)
          .set(this.state.participantData, alertIfError);

    }
    // reset testData
    this.transitionTo(this.getLink(this.getPageState().submit));
  },

  getLink(next) {
    return `/experiment/${this.getParams().name}/${next}`;
  },

  renderPager(pageState) {
    return (
      <ButtonToolbar>
        {
          pageState.exit ?
            <ButtonLink key='2' to={this.getLink(pageState.exit)}>End Survey</ButtonLink>
          : null
        }
        {
          pageState.next ?
            <ButtonLink key='1' to={this.getLink(pageState.next)}>Next</ButtonLink>
          : null
        }
        {
          pageState.extern ?
            <ButtonLink key='3' to={pageState.extern.href}>{pageState.extern.name}</ButtonLink>
          : null
        }
      </ButtonToolbar>
    );
  },

  renderInfoPage(info) {
    var pageState = this.getPageState();
    // markdown?
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: marked(info)}}>
        </div>
        {this.renderPager(pageState)}
      </div>
    );
  },

  renderFormPage(forms) {
    var pageState = this.getPageState();
    return (
      <div>
        {
          pageState.stimulus ?
          <Well>
            <Stimulus
              ref='stimulus'
              stimulus={pageState.stimulus}
              instruments={pageState.instruments}
            />
          </Well>
          : null
        }
        <FormGroup
          header={<h3>{pageState.title}</h3>}
          forms={forms}
          onValue={this.onValue}
          onSubmit={this.onSubmit}
        />
        {this.renderPager(pageState)}
      </div>
    );
  },

  renderPage() {
    switch (this.getParams().state) {
      case undefined: // intro page
        return this.renderInfoPage(experiment.formData.introPage);
      case 'inter-test':
        return this.renderInfoPage(experiment.formData.interTestPage);
      case 'post-test':
        return this.renderInfoPage(experiment.formData.postTestPage);
      case 'end':
        return this.renderInfoPage(experiment.formData.endPage);
      case 'test':
        return this.renderFormPage(experiment.testForms);
      case 'participant':
        return this.renderFormPage(experiment.participantForms);
      default:
        return <div>Page Not Found</div>;
    }
  },

  render () {
    return (
        <div>
          <h2>{this.getParams().name}</h2>
          {this.renderPage()}
        </div>
      );
  }
});

module.exports = ExperimentPage;

