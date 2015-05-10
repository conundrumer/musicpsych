'use strict';

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

  updateClassName(className) {
    var slider = this.getSliderDOMNode();
    var classNames = slider.className.split(' ');
    classNames.pop();
    classNames.push(className);
    slider.className = classNames.join(' ');
  },

  refresh() {
    this.slider.setAttribute('value', this.slider.getAttribute('value')[0]).refresh();
    var slider = this.getSliderDOMNode();
      var s = slider.querySelector('.top');
      var classNames = s.className.split(' ');
      classNames.pop();
      classNames.push('bottom');
      s.className = classNames.join(' ');
  },

  componentDidMount() {
    this.slider = new BootstrapSlider('#' + this.getID(), this.props);
    var slider = this.getSliderDOMNode();
    slider.className += ' bootstrap-slider ' + this.props.className;
    window.addEventListener('resize', this.refresh);
    this.refresh();

    slider.insertBefore(slider.children[slider.children.length - 1], slider.firstChild);

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

  render() {
    return (
      <div className='small'>
        <input id={this.getID()} type="number"/>
      </div>
    );
  }
});
module.exports = Slider;

