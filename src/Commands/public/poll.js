const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((options) =>
      options
        .setName('question')
        .setDescription('Provide the question of the poll')
        .setRequired(true)
    ),
  /**
   * @param {ChatInputInteraction} interaction
   */
  execute(interaction) {
    const pollQuestion = interaction.options.getString('question');
    const pollEmbed = new EmbedBuilder()
      .setDescription('**Question**\n' + pollQuestion)
      .setImage('https://i.ibb.co/vxdBKFd/Untitled-1.gif')
      .addFields([
        { name: "Yes's", value: '0', inline: true },
        { name: "No's", value: '0', inline: true },
      ])
      .setColor([104, 204, 156]);


      
  },
};
