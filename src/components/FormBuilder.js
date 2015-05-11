'use strict';

var _ = require('lodash');
var React = require('react/addons');
var FormSelector = require('./FormSelector');
var Bootstrap = require('react-bootstrap');
var Panel = Bootstrap.Panel;

//var Actions = require('actions/xxx')

require('styles/FormBuilder.less');

var FormBuilder = React.createClass({

  onFormUpdated(i, formData) {
    if (formData === null) {
      return this.onFormRemoved(i);
    }
    var forms = this.state.forms;
    var form = forms[i] || {};
    _.extend(form, formData);
    forms[i] = form;
    this.setState({forms: forms});
    this.onUpdate(forms);
  },

  onFormRemoved(i) {
    var forms = this.state.forms;
    // forms.splice(i, 1);
    forms[i] = undefined;
    this.setState({forms: forms});
    this.onUpdate(forms);
  },

  onUpdate(forms) {
    this.props.onUpdate(forms.filter((f) => f));
  },

  getDefaultProps() {
    return {
      forms: []
    };
  },

  getInitialState() {
    return {
      forms: this.props.forms //initial forms
    };
  },

  componentDidMount() {
    this.onUpdate(this.state.forms);
  },

  render() {
    return (
        <Panel header={this.props.header} bsStyle='primary'>
          {
            this.state.forms.map((form, i) =>
              <FormSelector {...form} key={i} id={i} onUpdate={(d) => this.onFormUpdated(i, d)}/>
            )
          }
          <FormSelector key={this.state.forms.length} type={null} onUpdate={(d) => this.onFormUpdated(this.state.forms.length, d)}/>
        </Panel>
      );
  }
});

module.exports = FormBuilder;

