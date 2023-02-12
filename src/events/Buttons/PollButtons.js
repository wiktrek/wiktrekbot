const { ButtonINteraction } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  /**
   * @param {ButtonInteraction } interaction
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;
  },
};
