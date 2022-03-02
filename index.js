const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client({
  intents: 32767,
});

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = config;

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
  leaveOnFinish: true,
  emitAddListWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});
module.exports = client;
// Initializing the project
require('./handler/index')(client);
client.destroy();
client.login(client.config.token);
