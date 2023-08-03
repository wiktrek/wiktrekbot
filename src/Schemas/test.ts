const { Schema, model, connect } = require('mongoose');
const ObjectId = Schema.ObjectId;

const Test = new Schema({
  name: String,
});
export const testModel = model('Test', Test);
