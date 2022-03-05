const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' });
module.exports = {
  name: 'tictactoe',
  description: 'tictactoe',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'opponent',
      description: 'who you want to play with',
      type: 'USER',
      required: false,
    },
  ],
  /**
   *
   *@param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    game.handleInteraction(interaction);
  },
};
