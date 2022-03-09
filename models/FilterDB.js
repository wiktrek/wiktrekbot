const { model, Schema } = require('mongoose');

module.exports = model(
  'filter',
  new Schema({
    Guild: String,
    Log: String,
    Words: [String],
  })
);
