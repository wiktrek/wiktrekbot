const { Message, Client, MessageEmbed } = require('discord.js');
const client = require('../../index');
module.exports = {
  name: 'FilterDetection',
};
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const { content, guild, author, channel } = message;

  const messageContent = content.toLowerCase().split(' ');
  const Filter = client.filters.get(guild.id);
  if (!Filter) return;

  const wordsUsed = [];
  let shoulddelete = false;

  messageContent.forEach((w) => {
    if (Filter.includes(w)) {
      wordsUsed.push(w);
      shoulddelete = true;
    }
  });

  if (shoulddelete) message.delete().catch(() => {});
  else return;
  if (wordsUsed.length) {
    const channelID = client.filtersLog.get(guild.id);
    if (!channelID) return;
    const channelObject = guild.channels.cache.get(channelID);
    if (!channelObject) return;

    const Embed = new MessageEmbed()
      .setColor('RED')
      .setAuthor({
        name: author.tag,
        iconURL: author.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        [
          `Used ${wordsUsed.length} blacklisted word(s) in ${channel} =>`,
          `\`${wordsUsed.map((w) => w)}\``,
        ].join('\n')
      );

    channelObject.send({ embeds: [Embed] });
  }
});
