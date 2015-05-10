'use strict';

var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var UnipolarSlider = require('./UnipolarSlider');
var BipolarSlider = require('./BipolarSlider');
var TYPES = require('../formWidgetTypes');
//var Actions = require('actions/xxx')

require('styles/FormWidget.less');

var FormWidget = React.createClass({

  getDefaultProps() {
    return {
      onValue: (k, v) => console.log(k, v)
    };
  },

  onValue(v) {
    this.props.onValue(this.props.name, v);
  },

  onChange(e) {
    this.onValue(e.target.value);
  },

  render() {
    switch (this.props.type) {
      case TYPES.BOOLEAN:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            <Input required
              name={this.props.name}
              type='radio'
              label='Yes'
              value={true}
              onChange={this.onChange}
            />
            <Input required
              name={this.props.name}
              type='radio'
              label='No'
              value={false}
              onChange={this.onChange}
            />
          </div>
        );
      case TYPES.NUMBER:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            <Input required
              name={this.props.name}
              type='number'
              min={this.props.min}
              max={this.props.max}
              onChange={this.onChange}
            />
          </div>
        );
      case TYPES.CHOICE:
        return (
          <div className="form-group">
            <label>{this.props.question}</label>
            {
              this.props.choices.map((choice) =>
                <Input required key={choice}
                  name={this.props.name}
                  type='radio'
                  label={choice}
                  value={choice}
                  onChange={this.onChange}
                />
              )
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

