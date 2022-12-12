const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  VoiceChannel,
  GuildEmoji,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('music')
    .setDescription('complete music system')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('play')
        .setDescription('Play a song')
        .addStringOption((option) =>
          option
            .setName('query')
            .setDescription('Provide the name or url for the song')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('volume')
        .setDescription('Adjust the song volume')
        .addNumberOption((option) =>
          option
            .setName('percent')
            .setDescription('10 = 10%')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('loop')
        .setDescription('loop')
        .addStringOption((option) =>
          option
            .setName('options')
            .setDescription('select an option')
            .setRequired(true)
            .addChoices(
              { name: 'off', value: 'off' },
              { name: 'song', value: 'song' },
              { name: 'queue', value: 'queue' }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('options')
        .setDescription('Select an option.')
        .addStringOption((option) =>
          option
            .setName('options')
            .setDescription('Select an option')
            .setRequired(true)
            .addChoices(
              { name: 'queue', value: 'queue' },
              { name: 'skip', value: 'skip' },
              { name: 'pause', value: 'pause' },
              { name: 'resume', value: 'resume' },
              { name: 'stop', value: 'stop' }
            )
        )
    ),
};
