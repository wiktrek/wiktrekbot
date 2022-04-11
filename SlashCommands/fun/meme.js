const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
module.exports = {
  name: 'meme',
  description: 'meme',
  /**
   *
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    //create an array of memes
    const config = require('../../config.json');
    const memes = config.memes;
    //create random index from 0 to the length of memes array
    var index = Math.floor(Math.random() * memes.length);
    //console.log(index);
    const memeEmbed = new MessageEmbed().setImage(memes[index]);

    //button that will change the meme
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('newMeme')
        .setLabel('New Meme')
        .setStyle('PRIMARY')
    );

    interaction.followUp({ embeds: [memeEmbed], components: [row] });
  },
};
