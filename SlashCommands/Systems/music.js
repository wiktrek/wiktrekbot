const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'music',
  description: 'Complete music system',
  options: [
    {
      name: 'play',
      description: 'play a song',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'query',
          description: 'Provide a name or a url for the song',
          type: 'STRING',
          required: true,
        },
      ],
    },
    {
      name: 'volume',
      description: 'alter the volume',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'percent',
          description: '10 = 10%',
          type: 'NUMBER',
          required: true,
        },
      ],
    },
    {
      name: 'settings',
      description: 'Select an option',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'options',
          description: 'Select an option',
          type: 'STRING',
          required: true,
          choices: [
            { name: 'queue', value: 'queue' },
            { name: 'skip', value: 'skip' },
            { name: 'pause', value: 'pause' },
            { name: 'resume', value: 'resume' },
            { name: 'stop', value: 'stop' },
          ],
        },
      ],
    },
  ],
  /**
   *@param {Client} client
   *@param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;
    if (!VoiceChannel)
      return interaction.channel.send({
        content:
          'You must be in a voice channel to be able to use the music command',
        ephemeral: true,
      });
    if (guild.me.voice.channelI && VoiceChannel.id !== guild.me.voice.channelId)
      return interaction.channel.send({
        content: `I'm already playing music in <#${guild.me.voice.channelId}>`,
        ephemeral: true,
      });
    try {
      switch (options.getSubcommand()) {
        case 'play': {
          console.log('tak');
          client.distube.play(VoiceChannel, options.getString('query'), {
            textChannel: channel,
            member: member,
          });
          return interaction.channel.send({ content: '🎼 Request recived' });
        }
        case 'volume': {
          const Volume = options.getNumber('percent');
          if (Volume > 100 || Volume < 1)
            return interaction.channel.send({
              content: 'You have to specify a number between 1 and 100',
            });
          client.distube.setVolume(VoiceChannel, Volume);
          return interaction.channel.send({
            content: `🔈 Volume has beem set to \`${Volume}\``,
          });
        }
        case 'settings': {
          const queue = await client.distube.getQueue(VoiceChannel);

          if (!queue)
            return interaction.channel.send({
              content: '⛔ there is no queue',
            });
          switch (options.getString('options')) {
            case 'skip':
              await queue.skip(VoiceChannel);
              return interaction.channel.send({
                content: '⏩ Song has been skipped',
              });
            case 'stop':
              await queue.stop(VoiceChannel);
              return interaction.channel.send({
                content: '⏹ music has been stopped',
              });
            case 'pause':
              await queue.pause(VoiceChannel);
              return interaction.channel.send({
                content: '⏸ song has been paused',
              });
            case 'resume':
              await queue.resume(VoiceChannel);
              return interaction.channel.send({
                content: '▶ song has been resumed',
              });
            case 'queue':
              const q = queue.songs
                .map(
                  (song, i) =>
                    `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${
                      song.formattedDuration
                    }\``
                )
                .join('\n');
              const queueEmbed = new MessageEmbed()
                .setColor('DARK_BLUE')
                .setDescription(`${q}`);
              return interaction.channel.send({
                embeds: [queueEmbed],
              });
          }
        }
      }
    } catch (err) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`⛔ Alert ${err}`);
      return interaction.channel.send({ embeds: [errorEmbed] });
    }
  },
};
