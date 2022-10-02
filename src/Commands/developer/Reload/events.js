const { ChatInputCommandInteraction, Client } = require('discord.js');
const { loadEvents } = require('../../../handlers/eventHandler');
module.exports = {
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param { Client } client
   */
  subCommand: 'reload.events',
  execute(interaction, client) {
    for (const [key, value] of client.events)
      client.removeListener(`${key}`, value, true);
    loadEvents(client);
    interaction.reply({ content: 'Reloaded Events', ephemeral: true });
  },
};
