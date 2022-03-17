const { Client, CommandInteraction } = require('discord.js');
const ms = require('ms');
module.exports = {
  name: 'timeout',
  description: 'timeout a user',
  userPerm: ['ADMINISTRATOR'],
  options: [
    {
      name: 'user',
      description: 'member to timeout',
      type: 'USER',
      required: true,
    },
    {
      name: 'length',
      description: 'length of timeout',
      type: 'STRING',
      required: true,
    },
    {
      name: 'reason',
      description: 'reason for this timeout',
      type: 'STRING',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.options.getUser('user');
    const length = interaction.options.getString('length');
    const reason = interaction.options.getString('reason');
    const member = interaction.guild.members.cache.get(user.id);

    const TimeInMS = ms(length);

    if (!TimeInMS)
      return interaction.followUp({ content: 'Please specify a valid time' });

    member.timeout(TimeInMS, reason);
    interaction.followUp({
      content: `${user} has been timeout-ed for ${length}! (${reason}) `,
    });
  },
};
