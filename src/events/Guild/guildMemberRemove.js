const { GuildMember, EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'guildMemberRemove',
  /**
   * @param {GuildMember} member
   *
   */
  async execute(member, client) {
    const GuildConfig = client.guildConfig.get(member.guild.id);
    const logChannel = (await member.guild.channels.fetch()).get(
      GuildConfig.logChannel
    );
    if (!logChannel) return;
    const accountCreation = parseInt(member.user.createdTimestamp / 1000);
    const Embed = new EmbedBuilder()
      .setAuthor({
        name: `${member.user.tag} | ${member.id}`,
        iconURL: member.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
      .setDescription(
        [
          `• User: ${member.user}`,
          `• AccountType: ${member.user.bot ? 'Bot' : 'User'}`,
          `• Account Created: <t:${accountCreation}:D> | <t:${accountCreation}:R>`,
        ].join('\n')
      )
      .setFooter({ text: 'Left' })
      .setTimestamp();
    logChannel.send({ embeds: [Embed] });
  },
};
