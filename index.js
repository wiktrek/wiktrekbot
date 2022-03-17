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

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
client.distube = new DisTube(client, {
  leaveOnFinish: true,
  emitNewSongOnly: true,
  youtubeDL: false,
  plugins: [new YtDlpPlugin()],
  //new SpotifyPlugin(),
});
require('./Systems/GiveawaySys')(client);
module.exports = client;
// Initializing the project
require('./handler/index')(client);

// distube
const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.join(', ') || 'Off'
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? 'All Queue'
        : 'This Song'
      : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      `Playing \`${song.name}\` - \`${
        song.formattedDuration
      }\`\nRequested by: ${song.user}\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    channel.send(` An error encountered: ${e.toString().slice(0, 1974)}`);
    console.error(e);
  })
  .on('empty', (channel) =>
    channel.send('Voice channel is empty! Leaving the channel...')
  )
  .on('searchNoResult', (message, query) =>
    message.channel.send(`No result found for \`${query}\`!`)
  )
  .on('finish', (queue) => queue.textChannel.send('Finished!'));
client.destroy();
client.login(client.config.token);
