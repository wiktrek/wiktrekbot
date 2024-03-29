const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;

const MoneySchema = new Schema({
  guildId: { type: String, require: true },
  userId: { type: String, require: true },
  money: { type: Number, default: 0 },
});
export const MoneyModel = model('Money', MoneySchema);
