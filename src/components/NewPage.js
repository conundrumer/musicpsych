'use strict';

var _ = require('lodash');
var React = require('react/addons');
// var Bootstrap = require('react-bootstrap');
// var Button = Bootstrap.Button;
var TYPES = require('../formWidgetTypes');
// var FormWidget = require('./FormWidget');
var FormBuilder = require('./FormBuilder');
var FormGroup = require('./FormGroup');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Firebase = require('firebase');
var FIREBASE_URL = 'https://popping-torch-2685.firebaseio.com/';
//var Actions = require('actions/xxx')

var experimentForms = [{
  name: 'experimentName',
  question: 'Name of Experiment',
  type: TYPES.TEXT
}, {
  name: 'introPage',
  question: 'Introduction Page (markdown)',
  type: TYPES.TEXTBOX
}, {
  name: 'interTestPage',
  question: 'Inter-test Page (markdown)',
  type: TYPES.TEXTBOX
}, {
  name: 'postTestPage',
  question: 'Post-test Page (markdown)',
  type: TYPES.TEXTBOX
}, {
  name: 'endPage',
  question: 'End of Experiment Page (markdown)',
  type: TYPES.TEXTBOX
}, {
  name: 'stimulus',
  question: 'Select which musical stimulus to study',
  type: TYPES.SELECT,
  choices: ['randomIntervals', 'randomTriads']
}, {
  name: 'instruments',
  question: 'Select which instruments to use to play the stimulus',
  type: TYPES.MULTI,
  choices: ['sine', 'synth']
}];



require('styles/NewPage.less');
var NewPage = React.createClass({

  mixins: [ Navigation ],

  componentWillMount() {
    this.fb = new Firebase(FIREBASE_URL);
  },

  onValue(name, value) {
    this.setState({[name]: value});
  },

  onUpdate(category, forms) {
    this.onValue(category, forms);
  },

  onSubmit() {
    console.log('submitting this:');
    console.log(this.state);
    // TODO: save name of experiment separately
    this.fb.child('experiments').child(this.state.experimentName)
      .set(this.state, (err) => {
        if (err) {
          alert("Data could not be saved." + err);
        } else {
          alert("Data saved successfully.");
          this.transitionTo('/');
        }
      });
  },

  getDefaultProps() {
    return _.merge(require('../exampleExperiment.js'), {
      pageTitle: 'Make a new Experiment'
    });
  },

  render() {
    return (
        <div>
          <FormGroup
            header={<h1>{this.props.pageTitle}</h1>}
            forms={experimentForms}
            onValue={this.onValue}
            onSubmit={this.onSubmit}
            formData={this.props.formData}
          >
            <FormBuilder
              header={<h2>Participant Survey</h2>}
              onUpdate={(forms)=>this.onUpdate('participantForms', forms)}
              forms={this.props.participantForms}
            />
            <FormBuilder
              header={<h2>Test Survey</h2>}
              onUpdate={(forms)=>this.onUpdate('testForms', forms)}
              forms={this.props.testForms}
            />
          </FormGroup>
        </div>
      );
  }
});

module.exports = NewPage;

