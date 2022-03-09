const client = require('../../index');
const { ButtonInteraction, MessageEmbed } = require('discord.js');
const DB = require('../../models/Ticket');
const { createTranscript } = require('discord-html-transcripts');
const TicketSetupData = require('../../models/TicketSetup');
module.exports = {
  name: 'TicketSetup',
};
client.on('interactionCreate', async (interaction) => {
  const { member, guild, channel, customId } = interaction;
  if (!interaction.isButton()) return;
  const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
  if (!TicketSetup)
    return interaction.reply({
      content: 'The data for this system is outdated',
    });
  if (!['close', 'Lock', 'unlock', 'claim'].includes(customId)) return;
  if (!member.roles.cache.find((r) => r.id === TicketSetup.Handlers))
    return interaction.reply({ content: 'You cannot use these buttons' });

  const embed = new MessageEmbed().setColor('BLUE');

  DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
    if (err) throw err;
    if (!docs)
      return interaction.reply({
        content:
          'No data was found related to this ticket, plase delete manual.',
        ephemeral: true,
      });
    switch (customId) {
      case 'Lock':
        if (docs.Locked == true)
          return interaction.reply({
            content: 'The ticket is already locked',
            ephemeral: true,
          });
        await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
        embed.setDescription('🔐 | this is now locked for reviewing');
        docs.Members.forEach((m) => {
          channel.permissionOverwrites.edit(m, {
            SEND_MESSAGES: false,
          });
        });

        interaction.reply({ embeds: [embed] });
        break;
      case 'unlock':
        if (docs.Locked == false)
          return interaction.reply({
            content: 'The ticket is already unlocked',
            ephemeral: true,
          });
        await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
        embed.setDescription('🔓 | this is now unlocked for reviewing');
        docs.Members.forEach((m) => {
          channel.permissionOverwrites.edit(m, {
            SEND_MESSAGES: true,
          });
        });
        interaction.reply({ embeds: [embed] });
        break;
      case 'close':
        if (docs.Closed == true)
          return interaction.reply({
            content: 'already closed, plase wait for it to get deleted',
            ephemeral: true,
          });
        const attachment = await createTranscript(channel, {
          limit: -1,
          returnBuffer: false,
          fileName: `${docs.Type} - ${docs.TicketID}.html`,
        });
        await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

        const MEMBER = guild.members.cache.get(docs.MemberID);
        const Message = await guild.channels.cache
          .get(TicketSetup.Transcripts)
          .send({
            embeds: [
              embed.setTitle(
                `Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`
              ),
            ],
            files: [attachment],
          });
        interaction.channel.send({
          embeds: [
            embed.setDescription(
              `The transcript is now saved [TRANSCRIPT](${Message.url})`
            ),
          ],
        });

        setTimeout(() => {
          channel.delete();
        }, 10 * 1000);
        break;
      case 'claim':
        if (docs.Claimed == true) {
          return interaction.channel.send({
            content: `This ticket has already been claimed by <@${docs.ClaimedBy}`,
            ephemeral: true,
          });
        }
        await DB.updateOne(
          { ChannelID: channel.id },
          { Claimed: true, ClaimedBy: member.id }
        );
        embed.setDescription(
          `✅ | This ticket is now claimed by ${member.name}`
        );
        interaction.channel.send({ embeds: [embed] });
    }
  });
});
