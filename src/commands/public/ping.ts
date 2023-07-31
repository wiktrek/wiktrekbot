import { CommandInteraction, InteractionDataOptionsString } from 'eris';
export default {
  name: 'ping',
  description: 'replies with pong!',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    interaction.createMessage({ content: 'Pong!' });
  },
};
