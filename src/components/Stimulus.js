'use strict';

var React = require('react/addons');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;
var ButtonGroup = Bootstrap.ButtonGroup;
var ListGroupItem = Bootstrap.ListGroupItem;
var neume = require('neume.js');

//var Actions = require('actions/xxx')

// http://mohayonao.github.io/neume.js/examples/mml-piano.html
function piano($, freq, dur) {
  return $([ 1, 5, 13, 0.5 ].map(function(x, i) {
    return $("sin", { freq: freq * x });
  })).mul(0.75)
  .$("shaper", { curve: 0.75 })
  .$("lpf", { freq: $("line", { start: freq * 3, end: freq * 0.75, dur: 3.5 }), Q: 6 })
  .$("xline", { start: 0.5, end: 0.01, dur: dur * 5 }).on("end", $.stop);
}

// http://en.wikipedia.org/wiki/MIDI_Tuning_Standard#Frequency_values
function freqToStep(hz) {
  return 69 + 12 * Math.log2(hz / 440);
}
function stepToFreq(step) {
  return 440 * Math.pow(2, (step - 69) / 12);
}

require('styles/Stimulus.less');

var Stimulus = React.createClass({

  getVariables() {
    return {
      center: this.state.center,
      interval: this.state.interval
    };
  },

  getInitialState() {
    // TODO: get this out to depend on different stimuli
    var center = 60 + (12 * Math.pow(Math.random(), 2));
    var interval = 12 * Math.random();
    return {
      instrumentPlaying: null,
      center: center,
      interval: interval
    };
  },

  componentWillMount() {
    this.neu = neume(new AudioContext());
  },

  componentWillUnmount() {
    if (this.state.instrumentPlaying) {
      this.playing.stop();
    }
  },

  getGlyph(instrument) {
    if (this.state.instrumentPlaying === instrument) {
      return 'stop';
    } else {
      return 'play';
    }
  },

  getInstrumentName(instrument) {
    switch (instrument) {
      case 'sine':
        return 'Sine wave';
      case 'synth':
        return 'Synthesizer';
    }
  },

  getGenerator($, instrument, freq) {
    // TODO: move this to a different file
    // TODO: formalize params
    switch (instrument) {
      case 'sine':
        return $('sin', { freq: freq }).mul(0.6);
      case 'synth':
        return piano($, freq, 1);
    }
  },

  play(instrument) {
    // TODO: move this to a different file
    switch (this.props.stimulus) {
      case 'randomIntervals':
        var pitch1 = this.state.center - this.state.interval / 2;
        var pitch2 = this.state.center + this.state.interval / 2;
        this.playing = this.neu.Synth(($) => $('+', {mul: 0.7},
          this.getGenerator($, instrument, stepToFreq(pitch1)),
          this.getGenerator($, instrument, stepToFreq(pitch2))
        ));
        break;
    }
    this.playing.start('now');
  },

  stop() {
    this.playing.stop();
  },

  onClick(instrument) {

    if (this.state.instrumentPlaying === null) {
      // play
      this.play(instrument);
      this.setState({instrumentPlaying: instrument });
    } else if (this.state.instrumentPlaying === instrument) {
      // stop
      this.stop();
      this.setState({instrumentPlaying: null });
    } else {
      // stop then play
      this.stop();
      this.play(instrument);
      this.setState({instrumentPlaying: instrument });
    }
  },

  render: function () {
    return (
        <div>
          <ButtonGroup vertical>
            {
              this.props.instruments.map((instrument, i) =>
                <Button
                  key={i}
                  bsSize='large'
                  onClick={() => this.onClick(instrument)}
                >
                  <Glyphicon glyph={this.getGlyph(instrument)} />
                  {this.getInstrumentName(instrument)}
                </Button>
              )
            }
          </ButtonGroup>
        </div>
      );
  }
});

module.exports = Stimulus;

