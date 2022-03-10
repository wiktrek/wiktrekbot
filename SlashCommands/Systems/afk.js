const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const DB = require('../../models/AFKDB');

module.exports = {
  name: 'afk',
  description: 'afk',
  options: [
    {
      name: 'set',
      description: 'set your AFK status',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'status',
          description: 'set your status',
          type: 'STRING',
          required: true,
        },
      ],
    },
    {
      name: 'return',
      description: 'return from being AFK',
      type: 'SUB_COMMAND',
    },
  ],
  /**
   *
   *@param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    const { guild, options, user, createdTimestamp } = interaction;
    const Embed = new MessageEmbed().setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL({ dynamic: true }),
    });

    const afkStatus = options.getString('status');

    switch (options.getSubcommand()) {
      case 'set': {
        await DB.findOneAndUpdate(
          { GuildID: guild.id, UserID: user.id },
          { Status: afkStatus, Time: parseInt(createdTimestamp / 1000) },
          { new: true, upsert: true }
        );
        Embed.setColor('GREEN').setDescription(
          `Your AFK status has been updated to ${afkStatus}`
        );
        return interaction.channel.send({
          embeds: [Embed],
          ephemeral: true,
        });
      }

      case 'return': {
        await DB.deleteOne({ GuildID: guild.id, UserID: user.id });
        Embed.setColor('RED').setDescription(
          `Your AFK status has been removed`
        );
        return interaction.channel.send({
          embeds: [Embed],
          ephemeral: true,
        });
      }
    }
  },
};
