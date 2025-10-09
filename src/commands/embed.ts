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
    }
  ],
  execute: async (client: BotClient, interaction: CommandInteraction) => {
    await interaction.defer();
    const embed = new Embed()
    const author = interaction?.data?.options[0]?.value;
    console.log(author)
    embed.setAuthor(author)
    
    embed.setTitle("Title")
    embed.setDescription("Description")
    embed.setColor(0x000000)
    interaction.createFollowup({
        embeds: [embed]
    })
  },
};

export default embed;