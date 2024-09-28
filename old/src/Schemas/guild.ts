const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;
export interface Item {
  name: string;
  price: number;
}
const GuildSchema = new Schema({
  guildId: { type: String, require: true },
  shop: {
    type: [
      {
        name: String,
        price: Number,
      },
    ],
    require: false,
  },
});
export const GuildModel = model('Guild', GuildSchema);
