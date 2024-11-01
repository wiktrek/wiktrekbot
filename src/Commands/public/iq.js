const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('iq')
    .setDescription('iq')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('Target @member')
        .setRequired(true)
    ),
  /*
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options, guild, member } = interaction;
    const target = options.getMember('target');
    const max = 200;
    const min = 10;
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    const embed = new EmbedBuilder()
      .setTitle(`iq ${target.displayName}`)
      .setDescription(`${random}`)
      .setColor('#D556C4');
    interaction.reply({
      embeds: [embed],
    });
  },
};
