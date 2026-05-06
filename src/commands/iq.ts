import { CommandInteraction } from "eris";
import { Command } from "../types/Command";
import { BotClient } from "../types/Client";

const min = 0;
const max = 200;
const iq: Command = {
  name: "iq",
  description: "Replies with your/someones iq!",
  execute: async (client: BotClient, interaction: CommandInteraction) => {
    await interaction.defer();

    const iqAmount = Math. random() * (max - min) + min;
    interaction.createFollowup(`iq: ${iqAmount}`)
  },
};

export default iq;