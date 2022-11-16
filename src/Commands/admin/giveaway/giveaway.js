const {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
} = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Create or manage a giveaway')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addSubcommand((options) =>
      options.setName('create').setDescription('Create a giveaway')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('menage')
        .setDescription('menage a giveaway')
        .addStringOption((option) =>
          option
            .setName('toggle')
            .setDescription('Provide an option to manage')
            .setRequired(true)
            .addChoices(
              { name: 'End', value: 'end' },
              { name: 'Pause', value: 'pause' },
              { name: 'Unpause', value: 'unpause' },
              { name: 'Reroll', value: 'reroll' },
              { name: 'Delete', value: 'delete' }
            )
        )
        .addStringOption((subcommand) =>
          subcommand
            .setName('message_id')
            .setDescription('Provide the message ID of the giveaway')
            .setRequired(true)
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
};
