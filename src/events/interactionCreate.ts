import { BotClient } from "../types/Client";
import { Event } from "../types/Event";
import { Interaction, CommandInteraction } from "eris";

const interactionCreate: Event = {
    name: "interactionCreate",
    once: true,
    async execute(client: BotClient, interaction: Interaction) {
        if(interaction instanceof CommandInteraction) {
            for(let slashCommand of client.commands.values()) {
                if (slashCommand.name === interaction.data.name) {
                    await slashCommand.execute(client, interaction)
                    break
                }
            }
        }
    },
};

export default interactionCreate