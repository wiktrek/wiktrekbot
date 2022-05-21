const { Client, CommandInteraction } = require('discord.js');
const { Canvas } = require('canvacord');
module.exports = {
  name: 'image',
  description: 'image',
  options: [
    {
      name: 'user',
      description: 'Select an user',
      type: 'USER',
      required: true,
    },
    {
      name: 'user2',
      description: 'Select an user',
      type: 'USER',
      required: true,
    },
    {
      name: 'options',
      description: 'Select an option',
      type: 'STRING',
      required: true,
      choices: [
        { name: 'slap', value: 'slap' },
        { name: 'trash', value: 'trash' },
        { name: 'wanted', value: 'wanted' },
        { name: 'facepalm', value: 'facepalm' },
        { name: 'beautiful', value: 'beautiful' },
        { name: 'blur', value: 'blur' },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * **/

  run: async (client, interaction) => {
    const user = interaction.options.getUser('user') || interaction.member;
    const user2 = interaction.options.getUser('user2') || interaction.member;
    const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
    const avatar2 = user2.displayAvatarURL({ dynamic: false, format: 'png' });
    switch (interaction.options.getString('options')) {
      case 'slap': {
        const image = await Canvas.slap(avatar, avatar2);
        return interaction.followUp({ files: [{ attachment: image }] });
      }
      case 'trash': {
        const image = await Canvas.trash(avatar);
        return interaction.followUp({
          files: [{ attachment: image }],
        });
      }
      case 'wanted': {
        const image = await Canvas.wanted(avatar);
        return interaction.followUp({
          files: [{ attachment: image }],
        });
      }
      case 'facepalm': {
        const image = await Canvas.facepalm(avatar);
        return interaction.followUp({ files: [{ attachment: image }] });
      }
      case 'beautiful': {
        const image = await Canvas.beautiful(avatar);
        return interaction.followUp({ files: [{ attachment: image }] });
      }
      case 'blur': {
        const image = await Canvas.blur(avatar);
        return interaction.followUp({ files: [{ attachment: image }] });
      }
    }
  },
};
