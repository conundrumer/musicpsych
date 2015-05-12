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

var FormGroup = require('./FormGroup');
var experiment = require('../exampleExperiment');

//var Actions = require('actions/xxx')

require('styles/ExperimentPage.less');

var ExperimentPage = React.createClass({
  mixins: [ State, Navigation ],

  getInitialState() {
    return {
      participantID: Math.random(), // you need to get this from the db
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
        };
      case 'test':
        return {
          title: 'Test Survey',
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
        // send the data
        console.log(
          'sending test data',
          this.state.participantID,
          this.state.numTests,
          this.state.testData
        );
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
          pageState.next ?
            <ButtonLink key='1' to={this.getLink(pageState.next)}>Next</ButtonLink>
          : null
        }
        {
          pageState.exit ?
            <ButtonLink key='2' to={this.getLink(pageState.exit)}>End Survey</ButtonLink>
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
        <Well>
        {pageState.stimulus}
        {pageState.instruments}
        </Well>
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

