import { CommandInteraction, InteractionDataOptionsString } from 'eris';
import { testModel } from '../../Schemas/test';
export default {
  name: 'test',
  description: 'test',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const test = new testModel({
      name: 'Bill',
    });
    await test.save();
    interaction.createFollowup({ content: 'Pong!' });
  },
};
