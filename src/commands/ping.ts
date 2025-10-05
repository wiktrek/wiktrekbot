import { CommandInteraction } from "eris";
import { Command } from "../types/Command";
import { BotClient } from "../types/Client";

const ping: Command = {
  name: "ping",
  description: "Replies with Pong!",
  execute: async (client: BotClient, interaction: CommandInteraction) => {
    await interaction.defer();
    interaction.createFollowup("pong!")
  },
};

export default ping;