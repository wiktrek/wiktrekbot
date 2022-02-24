const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'channeldelete',
  description: 'delete channel',
  userPerm: ['MANAGE_CHANNELS'],
  options: [
    {
      name: 'channel',
      description: 'select channel to ',
      type: 'CHANNEL',
      required: true,
    },
  ],
  /**
   *
   *@param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    const channel = interaction.options.getChannel('channel');
    const user = client.users.cache.get(interaction.member.user.id);
    user.send(`Deleted ${channel.name}`);
    channel.delete();
  },
};
