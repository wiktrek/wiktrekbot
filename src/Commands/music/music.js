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
        .addDescription('Play a song')
        .addStringOption((option) =>
          option
            .setName('query')
            .setDescription('Provide the name or url for the song')
            .setRequired(true)
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('volume')
            .addDescription('Adjust the song volume')
            .addStringOption((option) =>
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
            .setName('options')
            .addDescription('Select an option.')
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
        )
    ),
};