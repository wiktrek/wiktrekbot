import {
  CommandInteraction,
  EmbedOptions,
  InteractionDataOptionsString,
} from "eris";
import ky from "ky";
interface Affirmation {
  affirmation: string;
}
export default {
  name: "affirmation",
  description: "replies with an affirmation",
  options: [],
  run: async (
    interaction: CommandInteraction,
    args: InteractionDataOptionsString[]
  ) => {
    const a = await ky.get("https://www.affirmations.dev/").json<Affirmation>();
    const embed: EmbedOptions = {
      title: "Affirmation",
      color: 0x0e5bd0,
      description: a.affirmation,
      footer: {
        text: "affirmations.dev",
      },
    };
    interaction.createMessage({ embeds: [embed] });
  },
};
