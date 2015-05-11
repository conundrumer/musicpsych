'use strict';

var _ = require('lodash');
var React = require('react/addons');
var FormWidget = require('./FormWidget');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var Panel = Bootstrap.Panel;
//var Actions = require('actions/xxx')

require('styles/FormGroup.less');

var FormGroup = React.createClass({

  onValue(name, value) {
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({formData: formData});
    this.props.onValue(name, value);
  },

  onSubmit(e) {
    e.preventDefault();
    var incompletedForms = this.props.forms
      .filter( (form) => !this.state.formData[form.name]);

    if (incompletedForms.length > 0) {
      this.setState({error: true});
      return;
    }
    this.props.onSubmit();
  },

  getDefaultProps() {
    return {
      formData: {}
    };
  },

  getInitialState() {
    return {
      formData: _.clone(this.props.formData),
      error: false
    };
  },

  componentDidMount() {
    _.keys(this.state.formData).forEach((name) =>
      this.props.onValue(name, this.state.formData[name])
    );
  },

  render() {
    return (
        <form onSubmit={this.onSubmit} >
          <Panel header={this.props.header} bsStyle='primary'>
          {
            this.props.forms.map((form, i) =>
              <FormWidget {...form}
                key={i}
                onValue={this.onValue}
                value={this.state.formData[form.name] || null}
              />
            )
          }
          </Panel>
          {
            this.props.children
          }
          <Input type='submit'/>
          {
            this.state.error ?
              <p className="text-warning">Some of the survery was not completed...</p>
              : null
          }
        </form>
      );
  }
});

module.exports = FormGroup;

