const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require('discord.js');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

require('dotenv').config();
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});
const { loadEvents } = require('./handlers/eventHandler');

client.events = new Collection();
loadEvents(client);
client
  .login(process.env['TOKEN'])
  .then(() => {
    client.user.setActivity(`with ${client.guilds.cache.size} servers`);
  })

  .catch((err) => console.log(err));
