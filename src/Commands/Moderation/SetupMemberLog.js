const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup_memberlog')
    .setDescription('Configure the member logging system for your server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName('log_channel')
        .setDescription('Select the logging channel for this system')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName('member_role')
        .setDescription('Set the role to be automatically added to new members')
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName('bot_role')
        .setDescription('Set the role to be automatically added to new bots.')
        .setRequired(false)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execut(interaction, client) {
    const {} = interaction;
  },
};
