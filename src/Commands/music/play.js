const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  VoiceChannel,
  GuildEmoji,
} = require('discord.js');
module.exports = {
  subCommand: 'music.play',
  execute(interaction, client) {
    const { options, guild, member, channel } = interaction;
    const query = options.getString('query');
    const voiceChannel = member.voice.channel;
    const embed = new EmbedBuilder();
    if (!voiceChannel) {
      embed
        .setColor('Red')
        .setDescription(
          'You must be in a voice channel to execute music commands.'
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
    if (!member.voice.channelId === guild.members.me.voice.channelId) {
      embed
        .setColor('Red')
        .setDescription(
          `You can't use the music player as it is already active in <#${guild.members.me.voice.channelId}>`
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
    client.distube.play(voiceChannel, query, {
      textChannel: channel,
      member: member,
    });
    return interaction.reply({ content: '🎶 Request received.' });
  },
};
