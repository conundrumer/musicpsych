'use strict';

var React = require('react/addons');
var Slider = require('./Slider');

//var Actions = require('actions/xxx')

require('styles/BipolarSlider.less');

var BipolarSlider = React.createClass({

  getID() {
    return `bipolar-${this.props.dimension1}-${this.props.dimension2}-${this.props.id}`;
  },

  getLabels() {
    var dim1 = this.props.dimension1;
    var dim2 = this.props.dimension2;
    if (this.props.strong) {
      return [
        'Very<br/>' + dim1,
        'Moderately<br/>' + dim1,
        'Neither',
        'Moderately<br/>' + dim2,
        'Very<br/>' + dim2
      ];
    }
    return [
      'Very<br/>' + dim1,
      'Somewhat<br/>' + dim1,
      'Neither',
      'Somewhat<br/>' + dim2,
      'Very<br/>' + dim2
    ];
  },

  render() {
    return (
        <Slider id={this.getID()} className='bipolar'
          name={this.props.name}
          tooltip='always'
          step={0.1}
          ticks={[1, 2, 3, 4, 5]}
          ticks_labels={this.getLabels()}
          value={3}
          isBipolar={true}
          onValue={this.props.onValue}
        />
      );
  }
});

module.exports = BipolarSlider;

