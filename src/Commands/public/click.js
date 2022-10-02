const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('click').setDescription('click'),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('clickid')
        .setLabel('Click me!')
        .setStyle(ButtonStyle.Primary)
    );
    interaction.reply({ content: 'pong!', components: [row] });
  },
};
