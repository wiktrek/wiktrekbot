import { CommandInteraction } from "eris";
import { Command } from "../types/Command";
import { BotClient } from "../types/Client";

const serverInfo: Command = {
  name: "serverinfo",
  description: "Replies with serverinfo",
  execute: async (client: BotClient, interaction: CommandInteraction) => {
    await interaction.defer();
    const guild = client.guilds.get(interaction.guildID!);
    if (!guild) {
        interaction.createFollowup("Error no guild")
    } else {
        const message = `members: ${guild?.memberCount}\nowner: ${guild?.members.get(guild.ownerID)?.username}\nchannels: ${guild.channels.size}`
        interaction.createFollowup(message)
    }
  },
};

export default serverInfo;