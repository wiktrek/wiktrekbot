import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from 'eris';
import axios, { type AxiosResponse } from 'axios';
interface Affirmation {
  affirmation: string;
}
export default {
  name: 'affirmation',
  description: 'replies with an affirmation',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const a: AxiosResponse<Affirmation> = await axios({
      url: 'https://www.affirmations.dev/',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const embed: EmbedOptions = {
      title: 'Affirmation',
      color: 0x0e5bd0,
      description: a.data.affirmation,
      footer: {
        text: 'affirmations.dev',
      },
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
