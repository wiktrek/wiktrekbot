const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('ship')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('Target @member')
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('target2')
        .setDescription('Target @member2')
        .setRequired(false)
    ),
  /*
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options, guild, member } = interaction;
    const target = options.getMember('target');
    const target2 = options.getMember('target2') || member;
    console.log(target2);
    const random = Math.round(Math.random() * 100);
    const progress = '🟩'.repeat(Math.round(random / 10));
    const rest = '🟥'.repeat(10 - Math.round(random / 10));

    const bar = `${progress}${rest}`;
    console.log(bar);
    const embed = new EmbedBuilder()
      .setTitle(`>${target.displayName} \n>${target2.displayName}`)
      .setDescription(`${random}% ${bar}`)
      .setColor('#D556C4');
    interaction.reply({
      embeds: [embed],
    });
  },
};
