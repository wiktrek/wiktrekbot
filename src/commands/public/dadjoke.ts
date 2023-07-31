import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from 'eris';
import axios, { type AxiosResponse } from 'axios';
interface Joke {
  joke: string;
}
export default {
  name: 'dadjoke',
  description: 'replies with a dad joke',
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const a: AxiosResponse<Joke> = await axios({
      url: 'http://icanhazdadjoke.com',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const dadjoke = '';
    const embed: EmbedOptions = {
      title: 'Dad joke',
      color: 0x069e2d,
      description: a.data.joke,
      footer: {
        text: 'icanhazdadjoke.com',
      },
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
