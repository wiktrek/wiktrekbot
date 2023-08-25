const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;

const Money = new Schema({
  guildId: { type: String, require: true },
  userId: { type: String, require: true },
  money: { type: Number, default: 0 },
});
export const testModel = model('Money', Money);
