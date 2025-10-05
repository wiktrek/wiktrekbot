import { Event } from "../types/Event";
import { BotClient } from "../types/Client";
import { loadCommands } from "../handlers/commandHandler";

const ready: Event = {
    name: "ready",
    once: true,
    async execute(client: BotClient) {
        console.log(`Bot is ready! Logged in as ${client.user?.username}`);
        await loadCommands(client);
        console.log(`${client.commands}, ${client.events}`)
    },
};

export default ready