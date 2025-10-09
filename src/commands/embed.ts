import { CommandInteraction, EmbedOptions, InteractionDataOptions } from "eris";
import { Command } from "../types/Command";
import { BotClient } from "../types/Client";
import Embed from "../types/Embed";

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
    const author = interaction.data?.options?.[0]?.value;
    const title = interaction.data?.options?.[1]?.value;
    const description = interaction.data?.options?.[2]?.value;
    const color = interaction.data?.options?.[3]?.value;
    embed.setAuthor(author)
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setColor(color)
    interaction.createFollowup({
        embeds: [embed]
    })
  },
};

export default embed;