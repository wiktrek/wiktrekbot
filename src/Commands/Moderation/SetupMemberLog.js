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
    ),
};
