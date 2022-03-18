const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' });
module.exports = {
  name: 'tictactoe',
  description: 'tictactoe',
  options: [
    {
      name: 'opponent',
      description: 'select the user to play tictactoe with',
      type: 'USER',
      required: false,
    },
  ],
  /**
   *@param {Client} client
   *@param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    game.handleInteraction(interaction, client);
  },
};
