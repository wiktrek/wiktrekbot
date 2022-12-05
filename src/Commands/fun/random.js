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
    const min = options.getMember('min');
    const max = options.getMember('max');
    console.log(target2);
    const random = Math.round(Math.random() * 100);
    const embed = new EmbedBuilder()
      .setTitle(`>${target.displayName} \n>${target2.displayName}`)
      .setDescription(`${random}% ${bar}`)
      .setColor('#D556C4');
    interaction.reply({
      embeds: [embed],
    });
  },
};
