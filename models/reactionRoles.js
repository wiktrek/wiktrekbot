const mongoose = require('mongoose');
/**
* Roles structure
* - roleId: string
* - roleDescription: string
* - roleEmoji: string
*/

const Schema = new mongoose.Schema({
    guildId: String,
    roles: Array,
})

module.exports = mongoose.model('reaction-roles', Schema)