const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  VoiceChannel,
  GuildEmoji,
} = require('discord.js');
module.exports = {
  subCommand: 'music.options',
  async execute(interaction, client) {
    const { options, guild, member, channel } = interaction;
    const option = options.getString('option');
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
    const queue = await client.distube.getQueue(voiceChannel);
    if (!queue) {
    }
    switch (option) {
      case 'skip':
        await queue.skip(voiceChannel);
        embed;
        break;
    }
  },
};
