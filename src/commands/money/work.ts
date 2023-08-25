import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from 'eris';
interface Joke {
  joke: string;
}
export default {
  name: 'work',
  description: 'Work',
  cooldown: 10,
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    // @ts-ignore: Object is possibly 'null'.
    const low = 1;
    // @ts-ignore: Object is possibly 'null'.
    const max = 100;

    const random = Math.floor(Math.random() * (max - low + 1) + low);
    const embed: EmbedOptions = {
      title: `${interaction.member?.username}`,
      description: `You got ${random}$!`,
      color: 0x069e2d,
      footer: {
        text: 'ez',
      },
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
