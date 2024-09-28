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
    {
      name: 'amount',
      description: 'amount of numbers you want to generate',
      type: Constants.ApplicationCommandOptionTypes.NUMBER,
      required: false,
    },
  ],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const min: number = Number(args[0].value);
    const max: number = Number(args[1].value);
    const random: string[] = [];
    if (args[2] === undefined) {
      random.push(`${generateNumber(min, max)}\n`);
    } else {
      let amount = Number(args[2].value);
      while (amount > 0) {
        random.push(`${generateNumber(min, max)}\n`);
        amount -= 1;
      }
    }

    interaction.createMessage({
      content: `${random.join('')}`,
    });
  },
};
function generateNumber(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
