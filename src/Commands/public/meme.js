const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');
const axios = require('axios');
module.exports = {
  data: new SlashCommandBuilder().setName('meme').setDescription('meme'),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const response = await axios.get('https://reddit.com/r/memes.json');
    const { data } =
      response.data.data.children[
        Math.floor(Math.random() * response.data.data.children.length)
      ];
    const embed = new EmbedBuilder().setTitle(data.title).setImage(data.url);
    interaction.reply({ content: 'pong!', embeds: [embed] });
  },
};
