'use strict';

var _ = require('lodash');
var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Panel = Bootstrap.Panel;
var Button = Bootstrap.Button;
var FormWidget = require('./FormWidget');
var TYPES = require('../formWidgetTypes');

//var Actions = require('actions/xxx')

require('styles/FormSelector.less');

var formSelect = {
  name: 'form types',
  question: 'Select a form type',
  type: TYPES.SELECT,
  choices: _.values(TYPES)
};

var nameQuestionFields = [
  {
    name: 'name',
    question: 'Form Name',
    type: TYPES.TEXT
  }, {
    name: 'question',
    question: 'Question',
    type: TYPES.TEXT
  }
];

var formsFields = {
  boolean: [],
  number: [
    {
      name: 'min',
      question: 'Range Minimum',
      type: TYPES.NUMBER
    }, {
      name: 'max',
      question: 'Range Maximum',
      type: TYPES.NUMBER
    }
  ],
  choice: [
    {
      name: 'choices',
      question: 'Choices',
      type: TYPES.LIST
    }
  ],
  select: [
    {
      name: 'choices',
      question: 'Choices',
      type: TYPES.LIST
    }
  ],
  text: [],
  textbox: [],
  list: [],
  unipolar: [
    {
      name: 'dimension',
      question: 'Dimension, in the form of an adjective',
      type: TYPES.TEXT
    }
  ],
  bipolar: [
    {
      name: 'dimension1',
      question: 'Left dimension, in the form of an adjective',
      type: TYPES.TEXT
    }, {
      name: 'dimension2',
      question: 'Right dimension, in the form of an adjective',
      type: TYPES.TEXT
    }
  ]
};

_.values(TYPES).forEach((type) =>
  formsFields[type] = nameQuestionFields.concat(formsFields[type])
);

var FormSelector = React.createClass({

  onSelect(name, type) {
    this.props.onUpdate({type: type});
  },

  onUpdate(name, type) {
    this.props.onUpdate({[name]: type});
  },

  onRemove() {
    this.props.onUpdate(null);
  },

  render() {
    if (this.props.type === null) {
      return (
        <Panel bsStyle='info' header={<h3>Create a new form</h3>}>
          <FormWidget {...formSelect} onValue={this.onSelect} required={false} />
        </Panel>
      );
    } else if (formsFields[this.props.type]) {
      return (
        <Panel bsStyle='info' header={<h3>Creating a form of type: {this.props.type}</h3>}>
          <div className=''>
          {
            formsFields[this.props.type].map( (formFields, i) =>
              <FormWidget {...formFields} key={i} onValue={this.onUpdate} value={this.props[formFields.name]}/>
          )}
          <Panel header={<h4>Preview of "{this.props.name}"</h4>}>
              <FormWidget {...this.props} required={false}/>
          </Panel>
          <Button onClick={this.onRemove}>Remove this form</Button>
          </div>
        </Panel>
      );
    } else {
      return <div></div>;
    }
  }

});

module.exports = FormSelector;

