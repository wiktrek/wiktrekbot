import { CommandInteraction } from "discord.js";
export default {
  name: "ping",
  description: "replies with pong!",
  options: [],
  run: async (interaction: CommandInteraction) => {
    interaction.followUp({ content: "Pong!" });
  },
};
