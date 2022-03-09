const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client({
  intents: 32767,
});

// Global Variables
client.commands = new Collection();
client.filters = new Collection();
client.filtersLog = new Collection();
client.slashCommands = new Collection();
client.config = config;
require('./Systems/GiveawaySys')(client);
module.exports = client;
// Initializing the project
require('./handler/index')(client);
client.destroy();
client.login(client.config.token);
