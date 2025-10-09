import { CommandInteraction } from "eris";
import { Command } from "../types/Command";
import { BotClient } from "../types/Client";
import Embed from "../types/Embed";

const serverInfo: Command = {
  name: "serverinfo",
  description: "Replies with serverinfo",
  execute: async (client: BotClient, interaction: CommandInteraction) => {
    await interaction.defer();
    const guild = client.guilds.get(interaction.guildID!);
    if (!guild) {
        interaction.createFollowup("Error no guild")
    } else {
      const embed = new Embed()
      embed.setTitle(guild.name);
      embed.setDescription("")
      embed.setColor(0x05DD13)
      embed.addFields([
      {
        name: "owner",
        value: guild.members.get(guild.ownerID)?.username!,
      }, 
      {
        name: "members",
        value: `${guild.memberCount}`,
      },
      {
        name: "online",
        value: `${guild.members.filter(m => m.status == "online").length}`,
      },
      {
        name: "channels",
        value: `${guild.channels.size}`,
      }
    ])
      interaction.createFollowup({ embeds: [embed]})
    }
  },
};

export default serverInfo;