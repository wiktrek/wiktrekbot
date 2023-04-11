const mongoose = require('mongoose');

const VotedSchema = new mongoose.Schema({
  messageId: { type: String, require: true },
  userId: { type: String, require: true },
});

module.exports = mongoose.model('VotedMembers', VotedSchema);
