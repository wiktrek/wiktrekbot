const { ChatInputCommandInteraction, Client } = require('discord.js');
const { loadCommands } = require('../../../handlers/commandHandler');
module.exports = {
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param { Client } client
   */
  subCommand: 'reload.commands',
  execute(interaction, client) {
    loadCommands(client);
    interaction.reply({ content: 'Reloaded Commands', ephemeral: true });
  },
};
