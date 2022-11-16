const { ChatInputCommandInteraction } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const DB = require('../../Schemas/Note');
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'note-create') {
      const name = interaction.fields.getTextInputValue('note-name');
      const text = interaction.fields.getTextInputValue('note-text');
      if (!name || !text)
        return interaction.reply({ content: 'An error has occurred' });
      console.log(name, text);
      await DB.create(
        { userId: interaction.user.id },
        { name: name, unique: true },
        { text: text }
      );
      await interaction.reply({
        content: `Your submission was received successfully! ${interaction.user}`,
      });
    }
  },
};
