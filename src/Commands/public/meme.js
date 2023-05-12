const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('meme').setDescription('meme'),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const response = await axios.get('https://reddit.com/r/memes.json');

    interaction.reply({ content: 'pong!' });
  },
};
