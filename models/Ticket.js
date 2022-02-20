const { model, Schema } = require('mongoose');

module.exports = model(
  'Tickets',
  new Schema({
    GuildID: String,
    Members: [String],
    TicketID: String,
    ChannelID: String,
    Closed: Boolean,
    locked: Boolean,
    Type: String,
    Claimed: Boolean,
    ClaimedBy: String,
  })
);
