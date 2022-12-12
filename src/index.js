const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { DeezerPlugin } = require('@distube/deezer');
require('dotenv').config();
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
  partials: [User, Message, GuildMember, ThreadMember],
});
const { loadEvents } = require('./handlers/eventHandler');
const { connect } = require('mongoose');
client.subCommands = new Collection();
client.commands = new Collection();
client.events = new Collection();
connect(process.env.DATABASEURL, {}).then(() =>
  console.log('connected to mongoDB')
);
client.distube = new DisTube(client, {
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin(),
    // new YtDlpPlugin({ update: true }),
    new DeezerPlugin(),
  ],
});

loadEvents(client);
console.log(client.commands);
client
  .login(process.env['TOKEN'])
  .then(() => {
    client.user.setActivity(`with ${client.guilds.cache.size} servers`);
  })

  .catch((err) => console.log(err));
