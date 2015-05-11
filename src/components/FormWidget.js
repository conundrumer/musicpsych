'use strict';

var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var ListBuilder = require('./ListBuilder');
var UnipolarSlider = require('./UnipolarSlider');
var BipolarSlider = require('./BipolarSlider');
var TYPES = require('../formWidgetTypes');
//var Actions = require('actions/xxx')

require('styles/FormWidget.less');

var FormWidget = React.createClass({

  getDefaultProps() {
    return {
      value: null,
      onValue: (k, v) => console.log(k, v),
      choices: [],
      required: true
    };
  },

  onValue(v) {
    this.props.onValue(this.props.name, v);
  },

  onChange(e) {
    this.onValue(e.target.value);
  },

  render() {
    var defaultValue = this.props.value !== null ? this.props.value : '';
    switch (this.props.type) {
      case TYPES.BOOLEAN:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            <Input required={this.props.required}
              name={this.props.name}
              type='radio'
              label='Yes'
              value={true}
              onChange={this.onChange}
              defaultChecked={this.props.value === true}
            />
            <Input required={this.props.required}
              name={this.props.name}
              type='radio'
              label='No'
              value={false}
              onChange={this.onChange}
              defaultChecked={this.props.value === false}
            />
          </div>
        );
      case TYPES.NUMBER:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            <Input required={this.props.required}
              name={this.props.name}
              type='number'
              min={this.props.min}
              max={this.props.max}
              onChange={this.onChange}
              defaultValue={defaultValue}
            />
          </div>
        );
      case TYPES.CHOICE:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            {
              this.props.choices.map((choice, i) =>
                <Input required={this.props.required} key={i}
                  name={this.props.name}
                  type='radio'
                  label={choice}
                  value={choice}
                  onChange={this.onChange}
                  defaultChecked={this.props.value === choice}
                />
              )
            }
          </div>
        );
      case TYPES.SELECT:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            <Input required={this.props.required}
              name={this.props.name}
              type='select'
              defaultValue={defaultValue}
              onChange={this.onChange}
            >
            <option disabled hidden value=''>Select...</option>
            {
              this.props.choices.map((choice, i) =>
                <option key={i} value={choice}>
                  {choice}
                </option>
              )
            }
            </Input>
          </div>
        );
      case TYPES.TEXT:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            <Input required={this.props.required}
              name={this.props.name}
              type='text'
              placeholder='...'
              onChange={this.onChange}
              defaultValue={defaultValue}
            />
          </div>
        );
      case TYPES.TEXTBOX:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            <Input
              name={this.props.name}
              type='textarea'
              placeholder='...'
              onChange={this.onChange}
              defaultValue={defaultValue}
            />
          </div>
        );
      case TYPES.LIST:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            {
              <ListBuilder
                name={this.props.name}
                onValue={this.onValue}
                items={defaultValue || []}
              />
            }
          </div>
        );
      case TYPES.UNIPOLAR:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            {
              <UnipolarSlider
                name={this.props.name}
                dimension={this.props.dimension}
                id={this.props.id}
                strong={this.props.strong}
                onValue={this.onValue}
              />
            }
          </div>
        );
      case TYPES.BIPOLAR:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            {
              <BipolarSlider
                name={this.props.name}
                dimension1={this.props.dimension1}
                dimension2={this.props.dimension2}
                id={this.props.id}
                strong={this.props.strong}
                onValue={this.onValue}
              />
            }
          </div>
        );
      default:
        return <div>Undefined widget</div>;
    }
  }
});

module.exports = FormWidget;

