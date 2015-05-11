'use strict';

var React = require('react/addons');
var Slider = require('./Slider');

//var Actions = require('actions/xxx')

require('styles/UnipolarSlider.less');

var UnipolarSlider = React.createClass({

  getID() {
    return `unipolar-${this.props.dimension}-${this.props.id}`;
  },

  getLabels() {
    var dim = this.props.dimension;
    if (this.props.strong) {
      return [
        'Not at all<br/>' + dim,
        'Somewhat<br/>' + dim,
        'Moderately<br/>' + dim,
        'Very<br/>' + dim,
        'Extremely<br/>' + dim
      ];
    }
    return [
      'Not at all<br/>' + dim,
      'Slightly<br/>' + dim,
      'Somewhat<br/>' + dim,
      'Moderately<br/>' + dim,
      'Very<br/>' + dim
    ];
  },

  render() {
    return (
        <Slider id={this.getID()} className='unipolar'
          name={this.props.name}
          tooltip='always'
          step={0.1}
          ticks={[1, 2, 3, 4, 5]}
          ticks_labels={this.getLabels()}
          value={1}
          onValue={this.props.onValue}
        />
      );
  }
});

module.exports = UnipolarSlider;

