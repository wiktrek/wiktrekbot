const {
  MessageEmbed,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const DB = require('../../models/TicketSetup');

module.exports = {
  name: 'ticketsetup',
  description: 'setup your ticketing message',
  userPerm: ['ADMINISTRATOR'],
  options: [
    {
      name: 'channel',
      description: 'Select the ticket creation channel',
      required: true,
      type: 'CHANNEL',
      channelTypes: ['GUILD_TEXT'],
    },
    {
      name: 'category',
      description: "Select the ticket channel' creation category",
      required: true,
      type: 'CHANNEL',
      channelTypes: ['GUILD_CATEGORY'],
    },
    {
      name: 'transcripts',
      description: 'Select the transcripts creation channel',
      required: true,
      type: 'CHANNEL',
      channelTypes: ['GUILD_TEXT'],
    },
    {
      name: 'handlers',
      description: "Select the ticket handler' role",
      required: true,
      type: 'ROLE',
    },
    {
      name: 'everyone',
      description: 'provide the @everyone role ITS IMPORTANT!',
      required: true,
      type: 'ROLE',
    },
    {
      name: 'description',
      description: 'set the description of the ticket creation channel',
      required: true,
      type: 'STRING',
    },
    {
      name: 'firstbutton',
      description:
        'give your first button a name and add an emoji by adding a comma followed by the emoji',
      required: true,
      type: 'STRING',
    },
    {
      name: 'secondbutton',
      description:
        'give your second button a name and add an emoji by adding a comma followed by the emoji',
      required: true,
      type: 'STRING',
    },
    {
      name: 'thirdbutton  ',
      description:
        'give your third button a name and add an emoji by adding a comma followed by the emoji',
      required: true,
      type: 'STRING',
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const { guild, options } = interaction;

    try {
      const channel = options.getChannel('channel');
      const category = options.getChannel('category');
      const Transcripts = options.getChannel('transcripts');
      const handlers = options.getRole('handlers');
      const Everyone = options.getRole('everyone');

      const Description = options.getString('description');

      const Button1 = options.getString('firstbutton').split(',');
      const Button2 = options.getString('secondbutton').split(',');
      const Button3 = options.getString('thirdbutton').split(',');

      const Emoji1 = Button1[1];
      const Emoji2 = Button2[1];
      const Emoji3 = Button3[1];

      await DB.findOneAndUpdate(
        { GuildID: guild.id },
        {
          Everyone: Everyone.id,
          Channel: channel.id,
          Category: category.id,
          Transcripts: Transcripts.id,
          Handlers: handlers.id,
          Description: Description,
          Buttons: [Button1[0], Button2[0], Button3[0]],
        },
        {
          new: true,
          upsert: true,
        }
      );

      const Buttons = new MessageActionRow();
      Buttons.addComponents(
        new MessageButton()
          .setCustomId(Button1[0])
          .setLabel(Button1[0])
          .setStyle('PRIMARY')
          .setEmoji(Emoji1),
        new MessageButton()
          .setCustomId(Button2[0])
          .setLabel(Button2[0])
          .setStyle('SECONDARY')
          .setEmoji(Emoji2),
        new MessageButton()
          .setCustomId(Button3[0])
          .setLabel(Button3[0])
          .setStyle('SUCCESS')
          .setEmoji(Emoji3)
      );
      const embed = new MessageEmbed()
        .setAuthor({
          name: `${guild.name} | Ticketing System`,
          iconURL: guild.iconURL({ dynamic: true }),
        })
        .setDescription(`${Description} `)
        .setColor('#7F00FF');
      await guild.channels.cache
        .get(channel.id)
        .send({ embeds: [embed], components: [Buttons] });

      interaction.followUp({ content: 'Done', ephemeral: true });
    } catch (err) {
      const errEmbed = new MessageEmbed().setColor('#ffff').setDescription(
        `🛑 | An error occuured while setting up your ticket system\n**what to make sure of?**
          1.Make sure none of your buttons names are duplicated
          2.Make sure you use this format for your buttons => Name,Emoji
          3.Make sure your button names do not exeed 200 characters
          4.Make sure your button emojis, are actually emojis, not ids.`
      );
      console.log(err);
      interaction.followUp({ embeds: [errEmbed] });
    }
  },
};
