'use strict';

var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var ListGroup = Bootstrap.ListGroup;
var ListGroupItem = Bootstrap.ListGroupItem;
//var Actions = require('actions/xxx')

require('styles/ListBuilder.less');

var ListItem = React.createClass({

  focus() {
    console.log('focues');
    this.refs.input.getInputDOMNode().onfocus = function() {
      this.value = this.value;
    };
    this.refs.input.getInputDOMNode().focus();
  },

  render() {
    var remove = (
      <Button onClick={() => this.props.onChange(null)}>
        <Glyphicon glyph='remove' />
      </Button>
    );
    var attrs = {};
    if (this.props.removable) {
      attrs.buttonBefore = remove;
      attrs.required = true;
    }
    return (
      <ListGroupItem>
        <Input {...attrs}
          ref='input'
          name={this.props.name}
          type='text'
          value={this.props.value}
          placeholder='...'
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </ListGroupItem>
    );
  }
});

var ListBuilder = React.createClass({

  onItemUpdated(i, value) {
    if (value === null) {
      return this.onItemRemoved(i);
    }
    var items = this.state.items;
    items[i] = value;
    this.setState({items: items});
    this.props.onValue(items);
    setTimeout(() => this.refs[i].focus(), 0);
  },

  onItemRemoved(i) {
    var items = this.state.items;
    items.splice(i, 1);
    this.setState({items: items});
    this.props.onValue(items);
  },

  getInitialState() {
    return {
      items: []
    };
  },

  render: function () {
    return (
        <ListGroup>
          {
            this.state.items.map((item, i) =>
              <ListItem ref={i} key={i} value={item} onChange={(v) => this.onItemUpdated(i, v)} removable/>
            )
          }
          <ListItem key={this.state.items.length} value='' onChange={(v) => this.onItemUpdated(this.state.items.length, v)}/>
        </ListGroup>
      );
  }
});

module.exports = ListBuilder;

