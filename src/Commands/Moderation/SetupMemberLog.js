const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
} = require('discord.js');
const DB = require('../../Schemas/MemberLog');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup_memberlog')
    .setDescription('Configure the member logging system for your server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName('log_channel')
        .setDescription('Select the logging channel for this system')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName('member_role')
        .setDescription('Set the role to be automatically added to new members')
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName('bot_role')
        .setDescription('Set the role to be automatically added to new bots.')
        .setRequired(false)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, guild } = interaction;
    const logChannel = options.getChannel('log_channel').id;

    let memberRole = options.getRole('member_role')
      ? options.getRole('member_role').id
      : null;
    let botRole = options.getRole('bot_role')
      ? options.getRole('bot_role').id
      : null;
    await DB.findOneAndUpdate(
      { Guild: guild.id },
      {
        logChannel: logChannel,
        memberRole: memberRole,
        botRole: botRole,
      },
      { new: true, upsert: true }
    );
    client.guildConfig.set(guild.id, {
      logChannel: logChannel,
      memberRole: memberRole,
      botRole: botRole,
    });
    const Embed = new EmbedBuilder()
      .setColor('Green')
      .setDescription(
        [
          `- logging Channel updated: <#${logChannel}>`,
          `- Member Auto-Role updated: ${
            memberRole ? `<@&${memberRole}>` : 'Not Specified'
          }`,
          `- Bot Auto-Role updated: ${
            botRole ? `<@&${botRole}>` : 'Not Specified'
          }`,
        ].join('\n')
      );

    return interaction.reply({ embeds: [Embed] });
  },
};
