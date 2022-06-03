const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const simplydjs = require('simply-djs');
module.exports = {
  name: 'rockpaperscissors',
  description: 'rock paper scissors',
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'user to compete with in rock paper scissors',
      required: true,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    simplydjs.rps(interaction, {});
  },
};
