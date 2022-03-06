const { Client, CommandInteraction } = require('discord.js');
module.exports = {
  name: 'kick',
  description: 'kick a member',
  userPerm: ['KICK_MEMBERS'],
  options: [
    {
      name: 'target',
      description: 'target to kick',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'reason for this kick',
      type: 'STRING',
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString(
      'reason' || 'No reason provided'
    );

    if (
      target.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.followUp({
        content:
          'you cant take action on this user as their role is higher than yours',
      });
    await target.send(
      `you have been kicked from ${interaction.guild.name}, reason: ${reason}`
    );
    target.kick({ reason: reason });
    interaction.followUp({
      content: `Kicked ${target.user.tag} successfully! reason: ${reason}`,
    });
  },
};
