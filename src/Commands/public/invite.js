const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('invite').setDescription('invite'),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  // https://discord.com/api/oauth2/authorize?client_id=942891118201307156&permissions=8&scope=bot%20applications.commands
  execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Invite')
        .setURL(
          'https://discord.com/api/oauth2/authorize?client_id=942891118201307156&permissions=8&scope=bot%20applications.commands'
        )
        .setStyle('LINK')
    );
    interaction.reply({
      content: 'Invite me to your server',
      components: [row],
    });
  },
};
