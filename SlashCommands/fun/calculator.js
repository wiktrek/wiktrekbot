const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const simplydjs = require('simply-djs');
module.exports = {
  name: 'calculator',
  description: 'calculator',
  /**
   *
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    simplydjs.calculator(interaction, {
      embedColor: '#258fcc',
    });
  },
};
