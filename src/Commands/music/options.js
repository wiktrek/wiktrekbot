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
    const option = options.getString('options');
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
      embed.setColor('Red').setDescription(`There is no active queue`);
    }
    switch (option) {
      case 'skip':
        await queue.skip(voiceChannel);
        embed.setColor('Green').setDescription('⏩ The song has been skipped');
        return interaction.reply({ embeds: [embed], ephemeral: true });
      case 'stop':
        await queue.stop(voiceChannel);
        embed.setColor('Green').setDescription('🛑 The song has been stopped');
        return interaction.reply({ embeds: [embed], ephemeral: true });
      case 'skip':
        await queue.pause(voiceChannel);
        embed.setColor('Green').setDescription('⏸ The song has been paused');
        return interaction.reply({ embeds: [embed], ephemeral: true });
      case 'resume':
        await queue.resume(voiceChannel);
        embed.setColor('Green').setDescription('⏯ The song has been resumed');
        return interaction.reply({ embeds: [embed], ephemeral: true });
      case 'queue':
        embed
          .setColor('Purple')
          .setDescription(
            `${queue.songs.map(
              (song, id) =>
                `\n**${id + 1}.** ${song.name} -\`${song.formattedDuration}`
            )}`
          );
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
