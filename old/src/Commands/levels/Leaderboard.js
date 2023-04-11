const {
  AttachmentBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');
const User = require('../../Schemas/User');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('server Leaderboard'),
  async execute(interaction) {
    const { guild, member } = interaction;
    const guildId = member.guild.id;
    const leaderboard = await User.find({ guildId });
    leaderboard.sort();
    const userId = member.user.id;
    const embed = new EmbedBuilder().setTitle(`${guild.name}`);
    leaderboard.map((l, index) => {
      return embed.addFields({
        name: `${index + 1}`,
        value: `username: ${guild.members.cache.get(l.userId)} level: ${
          l.level
        }`,
      });
    });
    interaction.reply({ embeds: [embed] });
  },
};
