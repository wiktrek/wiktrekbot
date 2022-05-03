const DB = require('./../../models/Ticket');
const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'ticket',
  description: 'ticket Actions',
  userPerm: ['ADMINISTRATOR'],
  options: [
    {
      name: 'action',
      description: 'add or Remove a member from this ticket',
      type: 'STRING',
      required: true,
      choices: [
        { name: 'add', value: 'add' },
        { name: 'remove', value: 'remove' },
      ],
    },
    {
      name: 'target',
      description: 'Select a member',
      type: 'USER',
      required: true,
    },
  ],
  /**
   *
   *@param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    const { guildId, channel } = interaction;
    const Member = interaction.options.getMember('target');
    const Action = interaction.options.getString('action');
    const Embed = new MessageEmbed();

    switch (Action) {
      case 'add':
        DB.findOne(
          { GuildID: guildId, ChannelID: channel.id },
          async (err, docs) => {
            if (err) throw err;
            if (!docs)
              return channel.send({
                content: 'This channel is not tied with a ticket',
                ephermal: true,
              });
            if (docs.Members.includes(Member.id))
              return channel.send({
                content: 'this member is arleady added to this ticket',
                ephermal: true,
              });
            docs.Members.push(Member.id);
            channel.permissionOverwrites.edit(Member.id, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              READ_MESSAGE_HISTORY: true,
            });

            channel.send({
              content: `${Member} has been added to this ticket`,
            });
            docs.save();
          }
        );
        break;
      case 'remove':
        DB.findOne(
          { GuildID: guildId, ChannelID: channel.id },
          async (err, docs) => {
            if (err) throw err;
            if (!docs)
              return channel.send({
                content: 'This chanel is not tied with a ticket',
                ephermal: true,
              });
            if (!docs.Members.includes(Member.id))
              return channel.send({
                content: 'this member is not in this ticket',
                ephermal: true,
              });
            docs.Members.remove(Member.id);

            channel.permissionOverwrites.edit(Member.id, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false,
              READ_MESSAGE_HISTORY: false,
            });

            channel.send({
              content: `${Member} has been removed from this ticket`,
            });
            docs.save();
          }
        );
        break;
    }
  },
};
