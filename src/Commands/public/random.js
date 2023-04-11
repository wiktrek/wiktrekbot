const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('random')
    .addNumberOption((option) =>
      option.setName('min').setDescription('min').setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName('max').setDescription('max').setRequired(true)
    ),
  /*
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options, guild, member } = interaction;
    const min = options.getNumber('min');
    const max = options.getNumber('max');
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    if (min > max)
      return interaction.reply({
        content: `min > max. min value needs to be greater than max`,
      });
    const embed = new EmbedBuilder()
      .setTitle(`max:${max} min:${min}`)
      .setDescription(`random number: ${random}`)
      .setColor('#D556C4');
    interaction.reply({
      embeds: [embed],
    });
  },
};
