import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from "eris";
import ky from "ky";
interface Joke {
  joke: string;
}
export default {
  name: "dadjoke",
  description: "replies with a dad joke",
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const a = await ky.get("http://icanhazdadjoke.com").json<Joke>();
    const dadjoke = "";
    const embed: EmbedOptions = {
      title: "Dad joke",
      color: 0x069e2d,
      description: a.joke,
      footer: {
        text: "icanhazdadjoke.com",
      },
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
