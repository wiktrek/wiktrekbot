const { ButtonInteraction } = require('discord.js');
const DB = require('../../Schemas/VotedMembers');
module.exports = {
  name: 'interactionCreate',
  /**
   * @param {ButtonInteraction } interaction
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;
    const splittedArray = interaction.customId.split('-');
    if (splittedArray[0] !== 'Poll') return;
    const vote = await DB.findOne({
      messageId: interaction.message.id,
      userId: interaction.user.id,
    });
    if (vote)
      return interaction.reply({
        content: "You've already voted",
        ephemeral: true,
      });

    await DB.create({
      messageId: interaction.message.id,
      userId: interaction.user.id,
    });
    const pollEmbed = interaction.message.embeds[0];
    if (!pollEmbed)
      return interaction.reply({
        content: 'Unable to find poll embed.',
        ephemeral: true,
      });
    const yesField = pollEmbed.fields[0];
    const noField = pollEmbed.fields[1];
    const VoteCountedReply = 'Your vote has been counted';
    switch (splittedArray[1]) {
      case 'Yes':
        {
          const newYesCount = parseInt(yesField.value) + 1;
          yesField.value = newYesCount;
          interaction.reply({
            content: VoteCountedReply,
            ephemeral: true,
          });
          interaction.message.edit({ embeds: [pollEmbed] });
        }
        break;
      case 'No': {
        const newNoCount = parseInt(noField.value) + 1;
        noField.value = newNoCount;
        interaction.reply({
          content: VoteCountedReply,
          ephemeral: true,
        });
        interaction.message.edit({ embeds: [pollEmbed] });
      }
    }
  },
};
