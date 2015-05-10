'use strict';

var React = require('react/addons');
var FormWidget = require('./FormWidget');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
//var Actions = require('actions/xxx')

require('styles/FormGroup.less');

var FormGroup = React.createClass({

  onValue(name, value) {
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({formData: formData});
    console.log(name, value);
  },

  onSubmit(e) {
    e.preventDefault();
    var incompletedForms = this.props.forms
      .filter( (form) => !this.state.formData[form.name]);

    if (incompletedForms.length > 0) {
      this.setState({error: true});
      return;
    }
    console.log('submigiting');
  },

  getInitialState() {
    return {
      formData: {},
      error: false
    };
  },

  render() {
    return (
        <form onSubmit={this.onSubmit} >
          {
            this.props.forms.map((form, i) =>
              <FormWidget {...form} key={i} onValue={this.onValue} />
            )
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

