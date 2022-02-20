const client = require('../../index');
const {
  MessageButton,
  ButtonInteraction,
  MessageEmbed,
  MessageActionRow,
} = require('discord.js');
const DB = require('../../models/Ticket');
const TicketSetupData = require('../../models/TicketSetup');

module.exports = {
  name: 'InitialTicket',
}
client.on('interactionCreate', async (interaction) => {
    const { guild, member, customId, channel } = interaction;

    const Data = await TicketSetupData.findOne({ GuildID: guild.id });
    if (!Data) return;

    if (!Data.Buttons.includes(customId)) return;
    const ID = Math.floor(Math.random() * 90000 + 10000);
    await guild.channels
      .create(`${customId + '-' + ID}`, {
        type: 'GUILD_TEXT',
        parent: Data.Category,
        permissionsOverwrites: [
          {
            id: member.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: Data.Everyone,
            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          },
        ],
      })
      .then(async (channel) => {
        await DB.create({
          GuildID: guild.id,
          Members: member.id,
          TicketID: ID,
          ChannelID: channel.id,
          Closed: false,
          Locked: false,
          type: customId,
          Claimed: false,
        });
        const embed = new MessageEmbed()
          .setAuthor({
            name: `${guild.name} | Ticket: ${ID}`,
            iconURL: guild.iconURL({ dynamic: true }),
          })
          .setDescription(
            'Plase wait patiently for response from the Staff team, in the mean while, describe your issue in as much detail as possible'
          )
          .setFooter({ text: 'the buttons below are Staff only buttons' });

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
          new MessageButton()
            .setCustomId('close')
            .setLabel('Save & close')
            .setStyle('PRIMARY')
            .setEmoji('🎫'),
          new MessageButton()
            .setCustomId('Lock')
            .setLabel('Lock')
            .setStyle('SECONDARY')
            .setEmoji('🔐'),
          new MessageButton()
            .setCustomId('unlock')
            .setLabel('unlock')
            .setStyle('SUCCESS')
            .setEmoji('🔓'),
          new MessageButton()
            .setCustomId('claim')
            .setLabel('claim')
            .setStyle('PRIMARY')
            .setEmoji('✅')
        );

        channel.send({ embeds: [embed], components: [Buttons] });

        await channel
          .send({ content: `${member} here is your ticket` })
          .then((m) => {
            setTimeout(() => {
              m.delete().catch(() => {});
            }, 1 * 5000);
          });

        interaction.channel.send({
          content: `${member} your ticket has been created: ${channel}`,
          ephemeral: true,
        });
      });
  })
