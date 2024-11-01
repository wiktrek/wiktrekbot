const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
  ChatInputCommandInteraction,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('emit')
    .setDescription('Emit the guildMemberAdd/Remove events.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    client.emit('guildMemberAdd', interaction.member);
    interaction.reply({ content: 'emitted GuildMemberAdd', ephemeral: true });
  },
};
