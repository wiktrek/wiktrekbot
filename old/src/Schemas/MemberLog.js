const mongoose = require('mongoose');

const MemberLogSchema = new mongoose.Schema({
  Guild: String,
  memberRole: String,
  botRole: String,
});

module.exports = mongoose.model('MemberLog', MemberLogSchema);
