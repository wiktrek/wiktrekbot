import {
  CommandInteraction,
  Constants,
  InteractionDataOptionsNumber,
  InteractionDataOptionsString,
} from 'eris';
export default {
  name: 'random_number',
  description: 'generate random number',
  options: [
    {
      name: 'min',
      description: 'max number',
      type: Constants.ApplicationCommandOptionTypes.NUMBER,
      required: true,
    },
    {
      name: 'max',
      description: 'min number',
      type: Constants.ApplicationCommandOptionTypes.NUMBER,
      required: true,
    },
  ],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const min: number = Number(args[0].value);
    const max: number = Number(args[1].value);
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    interaction.createMessage({ content: `${random}` });
  },
};
