const { Client, CommandInteraction } = require('discord.js');
const { Canvas } = require('canvacord');
const ms = require('ms');
module.exports = {
  name: 'image',
  description: 'image',
  options: [
    {
      name: 'slap',
      description: 'slap someone',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'user',
          type: 'USER',
          required: false,
        },
      ],
    },
    {
      name: 'trash',
      description: 'trash',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'user',
          type: 'USER',
          required: false,
        },
      ],
    },
    {
      name: 'wanted',
      description: 'wanted',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'user',
          type: 'USER',
          required: false,
        },
      ],
    },
    {
      name: 'facepalm',
      description: 'facepalm',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'user',
          type: 'USER',
          required: false,
        },
      ],
    },
    {
      name: 'beautiful',
      description: 'beautiful',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'user',
          type: 'USER',
          required: false,
        },
      ],
    },
    {
      name: 'blur',
      description: 'blur',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'user',
          type: 'USER',
          required: false,
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * **/

  run: async (client, interaction) => {
    const user = interaction.options.getUser('user') || interaction.member;
    const user2 = interaction.member;
    const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
    const avatar2 = user2.displayAvatarURL({ dynamic: false, format: 'png' });
    switch (interaction.options.getSubcommand()) {
      case 'slap': {
        const image = await Canvas.slap(avatar2, avatar);
        return interaction.channel.send({ files: [{ attachment: image }] });
      }
      case 'trash': {
        const image = await Canvas.trash(avatar);
        return interaction.channel.send({
          files: [{ attachment: image }],
        });
      }
      case 'wanted': {
        const image = await Canvas.wanted(avatar);
        return interaction.channel.send({
          files: [{ attachment: image }],
        });
      }
      case 'facepalm': {
        const image = await Canvas.facepalm(avatar);
        return interaction.channel.send({ files: [{ attachment: image }] });
      }
      case 'beautiful': {
        const image = await Canvas.beautiful(avatar);
        return interaction.channel.send({ files: [{ attachment: image }] });
      }
      case 'blur': {
        const image = await Canvas.blur(avatar);
        return interaction.channel.send({ files: [{ attachment: image }] });
      }
    }
  },
};
