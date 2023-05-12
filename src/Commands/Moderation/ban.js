const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('ban')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName('target')
        .setDescription('Selecet the target member.')
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName('reason')
        .setDescription('Provide a reason for this ban')
        .setMaxLength(512)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options, guild, member } = interaction;
    const target = options.getMember('target');
    const reason = options.getString('reason') || 'None specified';
    if (!target.manageable || !target.moderatable)
      return interaction.reply({
        content: `${target} is not moderatable by this bot`,
      });
    if (member.roles.highest.position < target.roles.highest.position)
      return interaction.reply({
        content: `${target} has a higher role position than you`,
      });
    await target.ban({ reason }).catch((err) => {
      interaction.reply({ content: 'Could not ban user doe to an error' });
      console.log(err);
    });
    interaction.reply({ content: `Banned ${target}` });
  },
};
