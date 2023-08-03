import { CommandInteraction, InteractionDataOptionsString } from 'eris';
const mongoose = require('mongoose');
export default {
  name: 'test',
  description: 'test',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const Test = mongoose.model('Test');
    const test = new Test({
      name: 'Bill',
    });
    await test.save();
    interaction.createFollowup({ content: 'Pong!' });
  },
};
