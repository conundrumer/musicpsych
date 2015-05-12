var TYPES = require('./formWidgetTypes');

module.exports = {
  formData: {
    experimentName: `${Math.round(1000 * Math.random())} random tones`,
    introPage: 'In this experiment, you will first evaluate **as many tones as you would like**, then you will complete a demographic survey.',
    interTestPage: 'Thanks for your evaluation! Here\'s another one.',
    postTestPage: 'Now you will complete a demographic survey',
    endPage: 'Thank you for completing this experiment! [Fork me on GitHub](https://github.com/conundrumer/musicpsych)',
    stimulus: 'randomIntervals',
    instruments: [
      'sine',
      'synth'
    ]
    // instruments: 'sine'
  },
  participantForms: [{
    name: 'gender',
    question: 'What is your gender?',
    type: TYPES.CHOICE,
    choices: ['Male', 'Female']
  }, {
    name: 'age',
    question: 'What is your age?',
    type: TYPES.NUMBER,
    min: 0,
    max: 120
  }, {
    name: 'musical',
    question: 'Are you a trained musician?',
    type: TYPES.BOOLEAN
  }],
  testForms: [{
    name: 'valence',
    question: 'Are these tones conveying positive or negative feelings?',
    type: TYPES.BIPOLAR,
    dimension1: 'negative',
    dimension2: 'positive'
  }, {
    name: 'tension',
    question: 'How tense do you think these tones are? Are they calm and relaxed or tense and agitated?',
    type: TYPES.BIPOLAR,
    dimension1: 'calm',
    dimension2: 'tense'
  }]
};
