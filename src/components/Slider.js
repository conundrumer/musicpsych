'use strict';

var _ = require('lodash');
var React = require('react/addons');
var BootstrapSlider = require('bootstrap-slider');

//var Actions = require('actions/xxx')

require('bootstrap-slider/dist/css/bootstrap-slider.css');
require('../styles/Slider.less');


// TODO validate props to match api
var Slider = React.createClass({

  getID() {
    return 'bootstrap-slider-' + this.props.id;
  },

  getSliderDOMNode() {
    return React.findDOMNode(this).firstChild;
  },

  getHandleDOMNode() {
    return this.getSliderDOMNode().querySelector('.min-slider-handle');
  },

  getTooltipDOMNode() {
    return this.getSliderDOMNode().querySelector('.tooltip-main');
  },

  updateClassName(className) {
    var slider = this.getSliderDOMNode();
    var classNames = slider.className.split(' ');
    classNames.pop();
    classNames.push(className);
    slider.className = classNames.join(' ');
  },

  updateSelection() {
    // update labels
    this.props.ticks_labels.forEach( (label, i) => {
      if (this.slider.tickLabels[i]) {
        this.slider.tickLabels[i].innerHTML = label;
      }
    });
    if (!this.props.isBipolar) {
      return;
    }

    let left = Math.min(50, this.slider.percentage[0]);
    let width = Math.abs(this.slider.percentage[0] - 50);

    this.slider.trackSelection.style.left = left + '%';
    this.slider.trackSelection.style.width = width + '%';
    // var self = this;
    this.slider.ticks.forEach( (tick, i) => {
        let pos = 25 * (this.slider.options.ticks[i] - 1);
        if (pos >= left && pos <= left + width) {
          this.slider._addClass(tick, 'in-selection');
        } else {
          this.slider._removeClass(tick, 'in-selection');
        }
      }
    );
  },

  updateTooltips() {
    var tooltip = this.getTooltipDOMNode();
    var classNames = tooltip.className.split(' ');
    classNames.pop();
    classNames.push('bottom');
    tooltip.className = classNames.join(' ');
  },

  refresh() {
    this.slider.setAttribute('value', this.slider.getAttribute('value')[0]).refresh();
    this.updateTooltips();

    var _layout = this.slider._layout.bind(this.slider);
    this.slider._layout = () => {
      _layout();
      this.updateSelection();
    };

    this.slider.on('slideStart', () => this.setState({touched: true}));
    this.slider.on('change', (values) => this.props.onValue(values.newValue));
  },

  getInitialState() {
    return {
      touched: false
    };
  },

  componentDidMount() {
    this.slider = new BootstrapSlider('#' + this.getID(), this.props);

    var slider = this.getSliderDOMNode();
    slider.className += ' bootstrap-slider ' + this.props.className;
    window.addEventListener('resize', this.refresh);
    this.refresh();

    slider.insertBefore(slider.children[slider.children.length - 1], slider.firstChild);
    this.updateSelection();

    this.slider._addClass(this.getHandleDOMNode(), 'untouched');
    this.slider._removeClass(this.getTooltipDOMNode(), 'in');

  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.refresh);
    this.slider.destroy();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.className !== this.props.className) {
      this.updateClassName(nextProps.className);
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps, this.props);
  },

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.touched && this.state.touched) {
      this.slider._removeClass(this.getHandleDOMNode(), 'untouched');
      this.slider._addClass(this.getTooltipDOMNode(), 'in');
      this.props.onValue(this.slider.getValue());
    }
    this.refresh();
  },

  render() {
    return (
      <div className='small react-slider'>
        <input ref='input' name={this.props.name} id={this.getID()} type="number" required />
      </div>
    );
  }
});
module.exports = Slider;

