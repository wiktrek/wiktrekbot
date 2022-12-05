const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('change bot status')
    .addStringOption((option) =>
      option
        .setName('status')
        .setDescription("status. Write 'reset' t reset bot's status")
        .setRequired(true)
    ),
  execute(interaction, client) {
    const { options, guild, member } = interaction;
    const status = options.getString('status');
    if (status === 'reset') {
      client.user.setActivity(`with ${client.guilds.cache.size} servers`);
      interaction.reply({
        content: `changed status to: with ${client.guilds.cache.size} servers`,
      });
      return;
    }
    const finalstatus = `${status} `;
    client.user.setActivity(finalstatus);

    return interaction.reply({ content: `changed status to ${finalstatus}` });
  },
};
