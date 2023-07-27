import { Constants, CommandInteraction } from 'eris';

export default {
  data: {
    name: 'ping',
    description: 'Basic slash command.',
    type: Constants.ApplicationCommandTypes.CHAT_INPUT,
  },
  run: async (client: any, interaction: CommandInteraction) => {
    await interaction.createMessage(
      'Interaction received!\nRespond send from eris slash command handler.'
    );
  },
};
