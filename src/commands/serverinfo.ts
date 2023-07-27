import { CommandInteraction, InteractionDataOptionsString } from 'eris';
export default {
  name: 'serverinfo',
  description: 'server info',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    interaction.createMessage({ content: 'Pong!' });
  },
};
