import { CommandInteraction, EmbedOptions } from "eris";
import { Command } from "../types/Command";
import { BotClient } from "../types/Client";
import Embed from "../types/Embed";

const embed: Command = {
  name: "embed",
  description: "sends embed",
  execute: async (client: BotClient, interaction: CommandInteraction) => {
    await interaction.defer();
    const embed = new Embed()
    embed.setAuthor("Author")
    embed.setTitle("Title")
    embed.setDescription("Description")
    embed.setColor(0x000000)
    interaction.createFollowup({
        embeds: [embed]
    })
  },
};

export default embed;