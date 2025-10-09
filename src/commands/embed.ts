import { CommandInteraction, EmbedOptions, InteractionDataOptions } from "eris";
import { Command } from "../types/Command";
import { BotClient } from "../types/Client";
import Embed from "../types/Embed";
interface EmbedOption {
  name: string
  type: number
  value?: string | number | undefined
}
const embed: Command = {
  name: "embed",
  description: "sends embed",
  options: [
    {
        name: "author",
        description: "author",
        type: 3,
    },
    {
        name: "title",
        description: "title",
        type: 3,
    },
    {
        name: "description",
        description: "description",
        type: 3,
    },
    {
        name: "color",
        description: "hex color",
        type: 4,
    },
  ],
  execute: async (client: BotClient, interaction: CommandInteraction) => {
    await interaction.defer();
    const embed = new Embed();
    const options = interaction.data?.options as EmbedOption[] ?? [];
    const author = (options[0]?.value) || "";
    const title = (options[1]?.value) || "";
    const description = (options[2]?.value) || "";
    const color = (options[3]?.value)|| 0xff00ff;
    embed.setAuthor(author as string)
    embed.setTitle(title as string)
    embed.setDescription(description as string)
    embed.setColor(color as number)
    interaction.createFollowup({
        embeds: [embed]
    })
  },
};

export default embed;