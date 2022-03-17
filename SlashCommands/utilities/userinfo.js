const { ContextMenuInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'userinfo',
  type: 'USER',
  run: async (client, interaction) => {
    const {} = interaction;
    const target = await interaction.guild.members.fetch(interaction.targetId);
    const Embed = new MessageEmbed()
      .setColor('PURPLE')
      .setAuthor({
        name: target.user.tag,
        iconURL: target.user.avatarURL({ dynamic: true, size: 512 }),
      })
      .addFields(
        { name: 'ID', value: `${target.user.id}` },
        {
          name: 'Roles',
          value: `${target.roles.cache
            .map((r) => r)
            .join(' ')
            .replace('@everyone', '.')}`,
        },
        {
          name: 'Member Since',
          value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
        },
        {
          name: 'Discord User Since',
          value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
        }
      )
      .setFooter({ text: 'Last Checked:' })
      .setTimestamp();

    interaction.channel.send({ embeds: [Embed] });
  },
};
